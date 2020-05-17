
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next, lookup.has(block.key));
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error(`Cannot have duplicate keys in a keyed each`);
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/ContactCard.svelte generated by Svelte v3.22.2 */

    const file = "src/ContactCard.svelte";

    function create_fragment(ctx) {
    	let div3;
    	let header;
    	let div0;
    	let img;
    	let img_src_value;
    	let div0_class_value;
    	let t0;
    	let div1;
    	let h1;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let h2;
    	let t5;
    	let t6;
    	let div2;
    	let p0;
    	let t8;
    	let p1;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			header = element("header");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			t1 = text(/*userName*/ ctx[0]);
    			t2 = text(" | ");
    			t3 = text(/*initialName*/ ctx[4]);
    			t4 = space();
    			h2 = element("h2");
    			t5 = text(/*jobTitle*/ ctx[1]);
    			t6 = space();
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "A short description";
    			t8 = space();
    			p1 = element("p");
    			if (img.src !== (img_src_value = /*userImage*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-dt0uml");
    			add_location(img, file, 75, 12, 1416);

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(/*userImage*/ ctx[2] === true
    			? "thumb"
    			: "thumb thumb-placeholder") + " svelte-dt0uml"));

    			add_location(div0, file, 74, 8, 1331);
    			attr_dev(h1, "class", "svelte-dt0uml");
    			add_location(h1, file, 78, 12, 1506);
    			attr_dev(h2, "class", "svelte-dt0uml");
    			add_location(h2, file, 79, 12, 1554);
    			attr_dev(div1, "class", "user-data svelte-dt0uml");
    			add_location(div1, file, 77, 8, 1470);
    			attr_dev(header, "class", "svelte-dt0uml");
    			add_location(header, file, 73, 4, 1314);
    			add_location(p0, file, 83, 8, 1641);
    			add_location(p1, file, 84, 8, 1676);
    			attr_dev(div2, "class", "description svelte-dt0uml");
    			add_location(div2, file, 82, 4, 1607);
    			attr_dev(div3, "class", "contact-card svelte-dt0uml");
    			add_location(div3, file, 72, 0, 1283);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, header);
    			append_dev(header, div0);
    			append_dev(div0, img);
    			append_dev(header, t0);
    			append_dev(header, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(h1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, h2);
    			append_dev(h2, t5);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(div2, t8);
    			append_dev(div2, p1);
    			p1.innerHTML = /*description*/ ctx[3];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*userImage*/ 4 && img.src !== (img_src_value = /*userImage*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*userImage*/ 4 && div0_class_value !== (div0_class_value = "" + (null_to_empty(/*userImage*/ ctx[2] === true
    			? "thumb"
    			: "thumb thumb-placeholder") + " svelte-dt0uml"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*userName*/ 1) set_data_dev(t1, /*userName*/ ctx[0]);
    			if (dirty & /*jobTitle*/ 2) set_data_dev(t5, /*jobTitle*/ ctx[1]);
    			if (dirty & /*description*/ 8) p1.innerHTML = /*description*/ ctx[3];		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { userName } = $$props;
    	let { jobTitle } = $$props;
    	let { userImage } = $$props;
    	let { description } = $$props;
    	const initialName = userName;
    	const writable_props = ["userName", "jobTitle", "userImage", "description"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ContactCard> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ContactCard", $$slots, []);

    	$$self.$set = $$props => {
    		if ("userName" in $$props) $$invalidate(0, userName = $$props.userName);
    		if ("jobTitle" in $$props) $$invalidate(1, jobTitle = $$props.jobTitle);
    		if ("userImage" in $$props) $$invalidate(2, userImage = $$props.userImage);
    		if ("description" in $$props) $$invalidate(3, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({
    		userName,
    		jobTitle,
    		userImage,
    		description,
    		initialName
    	});

    	$$self.$inject_state = $$props => {
    		if ("userName" in $$props) $$invalidate(0, userName = $$props.userName);
    		if ("jobTitle" in $$props) $$invalidate(1, jobTitle = $$props.jobTitle);
    		if ("userImage" in $$props) $$invalidate(2, userImage = $$props.userImage);
    		if ("description" in $$props) $$invalidate(3, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [userName, jobTitle, userImage, description, initialName];
    }

    class ContactCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			userName: 0,
    			jobTitle: 1,
    			userImage: 2,
    			description: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactCard",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*userName*/ ctx[0] === undefined && !("userName" in props)) {
    			console.warn("<ContactCard> was created without expected prop 'userName'");
    		}

    		if (/*jobTitle*/ ctx[1] === undefined && !("jobTitle" in props)) {
    			console.warn("<ContactCard> was created without expected prop 'jobTitle'");
    		}

    		if (/*userImage*/ ctx[2] === undefined && !("userImage" in props)) {
    			console.warn("<ContactCard> was created without expected prop 'userImage'");
    		}

    		if (/*description*/ ctx[3] === undefined && !("description" in props)) {
    			console.warn("<ContactCard> was created without expected prop 'description'");
    		}
    	}

    	get userName() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set userName(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get jobTitle() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set jobTitle(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get userImage() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set userImage(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/CourseGoal.svelte generated by Svelte v3.22.2 */

    const file$1 = "src/CourseGoal.svelte";

    function create_fragment$1(ctx) {
    	let h1;
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(/*goal*/ ctx[0]);
    			toggle_class(h1, "higlight", /*doHighlight*/ ctx[1]);
    			add_location(h1, file$1, 14, 0, 160);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*goal*/ 1) set_data_dev(t, /*goal*/ ctx[0]);

    			if (dirty & /*doHighlight*/ 2) {
    				toggle_class(h1, "higlight", /*doHighlight*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { goal } = $$props;
    	const writable_props = ["goal"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CourseGoal> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("CourseGoal", $$slots, []);

    	$$self.$set = $$props => {
    		if ("goal" in $$props) $$invalidate(0, goal = $$props.goal);
    	};

    	$$self.$capture_state = () => ({ goal, doHighlight });

    	$$self.$inject_state = $$props => {
    		if ("goal" in $$props) $$invalidate(0, goal = $$props.goal);
    		if ("doHighlight" in $$props) $$invalidate(1, doHighlight = $$props.doHighlight);
    	};

    	let doHighlight;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*goal*/ 1) {
    			 $$invalidate(1, doHighlight = goal.includes("!"));
    		}
    	};

    	return [goal, doHighlight];
    }

    class CourseGoal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { goal: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CourseGoal",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*goal*/ ctx[0] === undefined && !("goal" in props)) {
    			console.warn("<CourseGoal> was created without expected prop 'goal'");
    		}
    	}

    	get goal() {
    		throw new Error("<CourseGoal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set goal(value) {
    		throw new Error("<CourseGoal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.22.2 */

    const { console: console_1 } = globals;
    const file$2 = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    // (152:4) {:else}
    function create_else_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Enter some data and hit the button";
    			add_location(p, file$2, 152, 8, 4335);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(152:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (150:4) {#if formState === "invalid"}
    function create_if_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Invalid input";
    			add_location(p, file$2, 150, 8, 4294);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(150:4) {#if formState === \\\"invalid\\\"}",
    		ctx
    	});

    	return block;
    }

    // (165:4) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Please start adding some contacts, we found none!";
    			add_location(p, file$2, 165, 8, 4754);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(165:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (157:4) {#each createdContacts as contact, index (contact.id)}
    function create_each_block(key_1, ctx) {
    	let h2;
    	let t0;
    	let t1_value = /*index*/ ctx[17] + 1 + "";
    	let t1;
    	let t2;
    	let current;

    	const contactcard = new ContactCard({
    			props: {
    				userName: /*contact*/ ctx[15].name,
    				jobTitle: /*contact*/ ctx[15].title,
    				userImage: /*contact*/ ctx[15].image,
    				description: /*contact*/ ctx[15].desc
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			h2 = element("h2");
    			t0 = text("# ");
    			t1 = text(t1_value);
    			t2 = space();
    			create_component(contactcard.$$.fragment);
    			add_location(h2, file$2, 157, 8, 4517);
    			this.first = h2;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			insert_dev(target, t2, anchor);
    			mount_component(contactcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*createdContacts*/ 32) && t1_value !== (t1_value = /*index*/ ctx[17] + 1 + "")) set_data_dev(t1, t1_value);
    			const contactcard_changes = {};
    			if (dirty & /*createdContacts*/ 32) contactcard_changes.userName = /*contact*/ ctx[15].name;
    			if (dirty & /*createdContacts*/ 32) contactcard_changes.jobTitle = /*contact*/ ctx[15].title;
    			if (dirty & /*createdContacts*/ 32) contactcard_changes.userImage = /*contact*/ ctx[15].image;
    			if (dirty & /*createdContacts*/ 32) contactcard_changes.description = /*contact*/ ctx[15].desc;
    			contactcard.$set(contactcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contactcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t2);
    			destroy_component(contactcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(157:4) {#each createdContacts as contact, index (contact.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let div4;
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let div1;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let div2;
    	let label2;
    	let t7;
    	let input2;
    	let t8;
    	let div3;
    	let label3;
    	let t10;
    	let input3;
    	let t11;
    	let button0;
    	let t13;
    	let button1;
    	let t15;
    	let button2;
    	let t17;
    	let t18;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t19;
    	let p;
    	let t20;
    	let a;
    	let t22;
    	let current;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*formState*/ ctx[4] === "invalid") return create_if_block;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	let each_value = /*createdContacts*/ ctx[5];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*contact*/ ctx[15].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			div4 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "User Name";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Job Title";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Image URL";
    			t7 = space();
    			input2 = element("input");
    			t8 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Description";
    			t10 = space();
    			input3 = element("input");
    			t11 = space();
    			button0 = element("button");
    			button0.textContent = "Add Contact Card";
    			t13 = space();
    			button1 = element("button");
    			button1.textContent = "Delete First";
    			t15 = space();
    			button2 = element("button");
    			button2.textContent = "Delete Last";
    			t17 = space();
    			if_block.c();
    			t18 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			t19 = space();
    			p = element("p");
    			t20 = text("Visit the ");
    			a = element("a");
    			a.textContent = "Svelte tutorial";
    			t22 = text(" to learn how to build Svelte apps.");
    			attr_dev(label0, "for", "userName");
    			add_location(label0, file$2, 127, 12, 3333);
    			attr_dev(input0, "type", "text");
    			input0.value = /*name*/ ctx[0];
    			attr_dev(input0, "id", "userName");
    			add_location(input0, file$2, 128, 12, 3385);
    			attr_dev(div0, "class", "form-control");
    			add_location(div0, file$2, 126, 8, 3294);
    			attr_dev(label1, "for", "jobTitle");
    			add_location(label1, file$2, 131, 12, 3519);
    			attr_dev(input1, "type", "text");
    			input1.value = /*title*/ ctx[1];
    			attr_dev(input1, "id", "jobTitle");
    			add_location(input1, file$2, 132, 12, 3571);
    			attr_dev(div1, "class", "form-control");
    			add_location(div1, file$2, 130, 8, 3480);
    			attr_dev(label2, "for", "image");
    			add_location(label2, file$2, 135, 12, 3705);
    			attr_dev(input2, "type", "text");
    			input2.value = /*image*/ ctx[2];
    			attr_dev(input2, "id", "image");
    			add_location(input2, file$2, 136, 12, 3754);
    			attr_dev(div2, "class", "form-control");
    			add_location(div2, file$2, 134, 8, 3666);
    			attr_dev(label3, "for", "desc");
    			add_location(label3, file$2, 139, 12, 3887);
    			attr_dev(input3, "type", "text");
    			input3.value = /*description*/ ctx[3];
    			add_location(input3, file$2, 140, 12, 3937);
    			attr_dev(div3, "class", "form-control");
    			add_location(div3, file$2, 138, 8, 3848);
    			attr_dev(div4, "id", "form");
    			attr_dev(div4, "class", "svelte-nevwws");
    			add_location(div4, file$2, 125, 4, 3270);
    			add_location(button0, file$2, 145, 4, 4068);
    			add_location(button1, file$2, 146, 4, 4143);
    			add_location(button2, file$2, 147, 4, 4200);
    			attr_dev(a, "href", "https://svelte.dev/tutorial");
    			add_location(a, file$2, 167, 17, 4840);
    			add_location(p, file$2, 167, 4, 4827);
    			add_location(main, file$2, 124, 0, 3259);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div4);
    			append_dev(div4, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			append_dev(div4, t5);
    			append_dev(div4, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t7);
    			append_dev(div2, input2);
    			append_dev(div4, t8);
    			append_dev(div4, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t10);
    			append_dev(div3, input3);
    			append_dev(main, t11);
    			append_dev(main, button0);
    			append_dev(main, t13);
    			append_dev(main, button1);
    			append_dev(main, t15);
    			append_dev(main, button2);
    			append_dev(main, t17);
    			if_block.m(main, null);
    			append_dev(main, t18);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(main, null);
    			}

    			append_dev(main, t19);
    			append_dev(main, p);
    			append_dev(p, t20);
    			append_dev(p, a);
    			append_dev(p, t22);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", /*nameInput*/ ctx[7], false, false, false),
    				listen_dev(input1, "input", /*jobInput*/ ctx[8], false, false, false),
    				listen_dev(input2, "input", /*imageInput*/ ctx[9], false, false, false),
    				listen_dev(input3, "input", /*jobDescInput*/ ctx[10], false, false, false),
    				listen_dev(button0, "click", prevent_default(/*addContact*/ ctx[6]), false, true, false),
    				listen_dev(button1, "click", /*deleteFirst*/ ctx[11], false, false, false),
    				listen_dev(button2, "click", /*deleteLast*/ ctx[12], false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
    				prop_dev(input0, "value", /*name*/ ctx[0]);
    			}

    			if (!current || dirty & /*title*/ 2 && input1.value !== /*title*/ ctx[1]) {
    				prop_dev(input1, "value", /*title*/ ctx[1]);
    			}

    			if (!current || dirty & /*image*/ 4 && input2.value !== /*image*/ ctx[2]) {
    				prop_dev(input2, "value", /*image*/ ctx[2]);
    			}

    			if (!current || dirty & /*description*/ 8 && input3.value !== /*description*/ ctx[3]) {
    				prop_dev(input3, "value", /*description*/ ctx[3]);
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(main, t18);
    				}
    			}

    			if (dirty & /*createdContacts*/ 32) {
    				const each_value = /*createdContacts*/ ctx[5];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, main, outro_and_destroy_block, create_each_block, t19, get_each_context);
    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block(ctx);
    					each_1_else.c();
    					each_1_else.m(main, t19);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_block.d();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (each_1_else) each_1_else.d();
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function incrementAge() {
    	age = age + 1;
    }

    function courseGoalInput(event) {
    	const enteredValue = event.target.value;
    	courseGoal = enteredValue;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let name = "";
    	let title = "";
    	let image = "";
    	let description = "";
    	let formState = "empty";
    	let createdContacts = [];

    	//#################################################################
    	function addContact(event) {
    		// event.preventDefault ()
    		if (name.trim().length == 0 || title.trim().length == 0 || image.trim().length == 0 || description.trim().length == 0) {
    			$$invalidate(4, formState = "invalid");
    			return;
    		}

    		// Svelte "reactivity" 
    		$$invalidate(5, createdContacts = [
    			...createdContacts,
    			{
    				id: Math.random(),
    				name,
    				jobTitl: title,
    				imageUr: image,
    				desc: description
    			}
    		]);

    		console.log({ ...createdContacts });
    		$$invalidate(4, formState = "done");
    	}

    	// Reset to default name variable
    	function changeName() {
    		$$invalidate(0, name = "John Doe");
    	}

    	// Set entered value as global
    	// Bind input element
    	function nameInput(event) {
    		const enteredValue = event.target.value;
    		$$invalidate(0, name = enteredValue);
    	}

    	function jobInput(event) {
    		const enteredValue = event.target.value;
    		$$invalidate(1, title = enteredValue);
    	}

    	function imageInput(event) {
    		const enteredValue = event.target.value;
    		$$invalidate(2, image = enteredValue);
    	}

    	function jobDescInput(event) {
    		const enteredValue = event.target.value;
    		$$invalidate(3, description = enteredValue);
    	}

    	function deleteFirst(event) {
    		$$invalidate(5, createdContacts = createdContacts.slice(1));
    	}

    	function deleteLast(event) {
    		$$invalidate(5, createdContacts = createdContacts.slice(0, -1));
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		ContactCard,
    		CourseGoal,
    		name,
    		title,
    		image,
    		description,
    		formState,
    		createdContacts,
    		addContact,
    		incrementAge,
    		changeName,
    		nameInput,
    		jobInput,
    		imageInput,
    		jobDescInput,
    		courseGoalInput,
    		deleteFirst,
    		deleteLast,
    		uppercaseName
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("title" in $$props) $$invalidate(1, title = $$props.title);
    		if ("image" in $$props) $$invalidate(2, image = $$props.image);
    		if ("description" in $$props) $$invalidate(3, description = $$props.description);
    		if ("formState" in $$props) $$invalidate(4, formState = $$props.formState);
    		if ("createdContacts" in $$props) $$invalidate(5, createdContacts = $$props.createdContacts);
    		if ("uppercaseName" in $$props) uppercaseName = $$props.uppercaseName;
    	};

    	let uppercaseName;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*name*/ 1) {
    			//#################################################################
    			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
    			// Label statement in svelte
    			 uppercaseName = name.toUpperCase();
    		}

    		if ($$self.$$.dirty & /*name*/ 1) {
    			//$: console.log (name)
    			// using a dynamic Label statement with if statement
    			 if (name === "John Doe") {
    				console.log("It changes the age");
    				age = 25;
    			}
    		}
    	};

    	return [
    		name,
    		title,
    		image,
    		description,
    		formState,
    		createdContacts,
    		addContact,
    		nameInput,
    		jobInput,
    		imageInput,
    		jobDescInput,
    		deleteFirst,
    		deleteLast
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
