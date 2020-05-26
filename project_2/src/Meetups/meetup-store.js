import { writable } from "svelte/store"


const meetups = writable ([
    {
        id              : "meetup1",
        title           : "Frontend Development with SvelteJS",
        subtitle        : "Create a todo with svelte",
        time            : "16:00 GMT",
        description     : "In this meetup, we will have some exprets talks about front-end development",
        imageUrl        : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
        address         : "27th Munchies Road, 22441 New Mark",
        contactEmail    : "code@test.com",
        isFavorite      : false
    },
    {
        id              : "meetup2",
        title           : "Backend with hapiJS",
        subtitle        : "Why hapiJS not express?",
        time            : "16:00 GMT",
        description     : "In this meetup, we talk about back-end development",
        imageUrl        : "https://blog.newrelic.com/wp-content/uploads/hapijs.jpg",
        address         : "27th Munchies Road, 22441 New Mark",
        contactEmail    : "codeExpress@test.com",
        isFavorite      : false
    },
])

const customMeetupsStore = {
    subscribe       : meetups.subscribe,
    addMeetup       : (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id              : Math.random ().toString (),
            isFavorite      : false
        }
        meetups.update (items => {
            return [newMeetup, ...items]
        })
    },
    updateMeetup    : (id, meetupData) => {
        meetups.update ((items) => {
            const meetupIndex = items.findIndex (i => i.id === id)
            const updatedMeetup = { ...items [meetupIndex], ...meetupData }
            const updatedMeetups = [...items]
            updatedMeetups [meetupIndex] = updatedMeetup
            return updatedMeetups
        })
    },
    removeMeetup    : (id) => {
        meetups.update ((items) => {
            return items.filter (i => i.id !== id)
        })
    },
    toggleFavorite  : (id) => {
        meetups.update (items => {
            const updatedMeetup = { ...items.find(m => m.id === id) }
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite
            const meetupIndex = items.findIndex(m => m.id === id)
            const updatedMeetups = [...items]
            updatedMeetups[meetupIndex] = updatedMeetup
            return updatedMeetups
        })
    }
}

export default customMeetupsStore
