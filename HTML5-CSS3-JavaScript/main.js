// Exercise 1: JavaScript Basics & Setup
// JavaScript entry for Local Community Event Portal

console.log("Welcome to the Community Portal");

window.addEventListener('load', function () {
  // alert to notify when the page is fully loaded (Exercise 1)
  alert('Community Portal Loaded');
});

// Track whether the form has unsaved changes (Exercise 7: onbeforeunload)
let isFormDirty = false

// Exercise 2: simple const / let sample with template literal and seat update
const sampleEventName = 'Community Cleanup Drive'
const sampleEventDate = '2026-07-15'
let sampleSeats = 10
const sampleEventInfo = `${sampleEventName} on ${sampleEventDate} has ${sampleSeats} seats`
console.log(sampleEventInfo)
sampleSeats--

// Exercise 9: mock JSON endpoint data used for fetch examples
const mockApiData = {
  events: [
    { id: 1, name: 'Community Cleanup Drive', date: '2026-07-15', category: 'community', seats: 10 },
    { id: 2, name: 'Tree Plantation', date: '2026-07-22', category: 'community', seats: 10 },
    { id: 3, name: 'Food Festival', date: '2026-08-10', category: 'food', seats: 5 },
    { id: 4, name: 'Tech Meetup', date: '2026-08-24', category: 'workshop', seats: 20 },
    { id: 5, name: 'Marathon', date: '2026-09-05', category: 'sports', seats: 8 },
    { id: 6, name: 'Cultural Event', date: '2026-09-20', category: 'art', seats: 15 }
  ],
  announcements: [
    'Community Cleanup Drive registration is open',
    'Tree Plantation volunteers are needed',
    'Food Festival stalls are being arranged'
  ]
}
const mockApiUrl = 'data:application/json,' + encodeURIComponent(JSON.stringify(mockApiData))

// Exercise 5: Objects and Prototypes
function Event(id, name, date, category, seats) {
  this.id = id
  this.name = name
  this.date = date
  this.category = category
  this.seats = seats
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0
}

// Exercise 2 & 6: Syntax, Data Types, Arrays and Methods
const PORTAL_NAME = 'Local Community Portal' // const for fixed
let totalRegistrations = 0 // let for changing
let eventsList = [
  new Event(1, 'Community Cleanup Drive', '2026-07-15', 'community', 10),
  new Event(2, 'Tree Plantation', '2026-07-22', 'community', 10),
  new Event(3, 'Food Festival', '2026-08-10', 'food', 5),
  new Event(4, 'Tech Meetup', '2026-08-24', 'workshop', 20),
  new Event(5, 'Marathon', '2026-09-05', 'sports', 8),
  new Event(6, 'Cultural Event', '2026-09-20', 'art', 15)
]

// Exercise 4: Functions, Scope, Closures
function createCounter() {
  let count = 0
  return function () {
    count++
    return count
  }
}
const trackedRegs = createCounter()

// Exercise 4: Higher-order functions with default parameter (Exercise 10)
function addEvent(name, date, category, seats = 10) {
  const id = eventsList.length + 1
  eventsList.push(new Event(id, name, date, category, seats)) // .push() (Exercise 6)
  return id
}

function filterEventsByCategory(category) {
  if (!category || category === 'all') return [...eventsList]
  return eventsList.filter(e => e.category === category)
}

function filterEventsWithCallback(callback) {
  return eventsList.filter(callback)
}

// Exercise 7: DOM Manipulation
function displayEvents(list) {
  const container = document.querySelector('#eventsContainer')
  if (!container) return
  container.innerHTML = ''
  // Exercise 3: only show upcoming events that still have seats
  const filteredList = list.filter(ev => {
    try {
      const evDate = new Date(ev.date)
      const now = new Date()
      // skip past events and events with no seats
      return ev.seats > 0 && evDate >= new Date(now.toDateString())
    } catch (e) {
      return ev.seats > 0
    }
  })

  filteredList.forEach(ev => {
    const card = document.createElement('div')
    card.className = 'event-card'
    // Exercise 10: Modern JS - using template literal & destructuring
    const { id, name, date, category, seats } = ev
    const registerBtn = seats === 0 ? '<button disabled>Sold Out</button>' : `<button onclick="registerUser(${id})">Register</button>`
    const cancelBtn = `<button onclick="cancelRegistration(${id})">Cancel</button>`
    card.innerHTML = `<h3>${name}</h3><p>Category: ${category}</p><p>Date: ${date}</p><p id="seats-${id}">Seats: ${seats}</p>${registerBtn} ${cancelBtn}`
    container.appendChild(card)
    // Exercise 14: jQuery small effect if available
    if (typeof $ !== 'undefined') $(card).hide().fadeIn(400)
  })
}

// Exercise 6: Using .map() to format display cards
function getEventCardsHTML(list) {
  return list.map(ev => {
    const { id, name, date, category, seats } = ev
    return `<div class="event-card"><h3>${name}</h3><p>Category: ${category}</p><p>Date: ${date}</p><p>Seats: ${seats}</p></div>`
  }).join('')
}

// Exercise 3 & 8: Filtering and event helpers
function filterEvents() {
  const sel = document.getElementById('categoryFilter')
  const category = sel ? sel.value : 'all'
  const filtered = filterEventsByCategory(category)
  displayEvents(filtered)
}

function handleSearch(e) {
  if (e.key === 'Enter') {
    const q = document.getElementById('eventSearch').value.toLowerCase()
    const filtered = filterEventsWithCallback(ev => ev.name.toLowerCase().includes(q))
    displayEvents(filtered)
  }
}

// Exercise 3: Conditionals, Loops, Error Handling
function registerUser(id) {
  try {
    const ev = eventsList.find(x => x.id === id)
    if (!ev) throw new Error('Event not found')
    if (!ev.checkAvailability()) throw new Error('No seats available')
    // Exercise 2: use -- operator to manage seats
    ev.seats--
    totalRegistrations = trackedRegs()
    alert('Registered for ' + ev.name + ' (total ' + totalRegistrations + ')')
    console.log('Event data:', Object.entries(ev)) // Exercise 5: Object.entries
    filterEvents()
  } catch (err) {
    alert('Registration failed: ' + err.message)
  }
}

function cancelRegistration(id) {
  const ev = eventsList.find(x => x.id === id)
  if (!ev) return
  ev.seats++
  totalRegistrations = Math.max(0, totalRegistrations - 1)
  alert('Registration cancelled for ' + ev.name)
  const seatBox = document.getElementById('seats-' + id)
  if (seatBox) seatBox.innerText = 'Seats: ' + ev.seats
  if (typeof $ !== 'undefined') {
    $('#eventsContainer .event-card').fadeOut(80).fadeIn(80)
  }
  filterEvents()
}

// Exercise 9: Async JS, Promises, Async/Await
async function loadEventsFromMockApi() {
  const status = document.getElementById('eventsStatus')
  const spinner = document.getElementById('eventsSpinner')
  if (spinner) spinner.classList.remove('hidden')
  if (status) status.innerText = 'Loading event data from mock JSON...'
  try {
    const response = await fetch(mockApiUrl)
    const data = await response.json()
    eventsList = data.events.map(ev => new Event(ev.id, ev.name, ev.date, ev.category, ev.seats))
    if (status) status.innerText = 'Event data loaded from mock JSON'
    filterEvents()
  } catch (e) {
    if (status) status.innerText = 'Using default event data'
    filterEvents()
  } finally {
    if (spinner) spinner.classList.add('hidden')
  }
}

// Exercise 9: Promise-based version with .then() and .catch()
function loadAnnouncementsPromise() {
  const title = document.getElementById('loaderText')
  const spinner = document.getElementById('announcementSpinner')
  if (spinner) spinner.classList.remove('hidden')
  if (title) title.innerText = 'Loading announcements...'
  fetch(mockApiUrl)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('announcementList')
      if (list) {
        list.innerHTML = ''
        data.announcements.forEach(i => { const li = document.createElement('li'); li.innerText = i; list.appendChild(li) })
      }
      if (title) title.innerText = 'Latest Announcements'
    })
    .catch(() => {
      if (title) title.innerText = 'Could not load announcements'
    })
    .finally(() => {
      if (spinner) spinner.classList.add('hidden')
    })
}

// Exercise 6: Event Feedback with Events Handling
function validatePhone() {
  const ph = document.getElementById('phoneField')
  if (!ph) return true
  const v = ph.value.trim()
  const ok = /^[0-9]{10}$/.test(v)
  ph.style.borderColor = ok ? '#ccc' : 'red'
  return ok
}

function handleRegisterClick(e) {
  if (e) e.preventDefault()
  const form = document.getElementById('regForm')
  if (form) submitRegistration(form)
  return false
}

// Exercise 8: Saving User Preferences
function showFee(selectEl) {
  const fees = { cleanup: '0', plantation: '0', food: '50', art: '20', workshop: '10', sports: '0' }
  const v = selectEl.value
  const out = document.getElementById('feeDisplay')
  if (out) out.innerText = fees[v] !== undefined ? (fees[v] === '0' ? 'Free' : 'Rs. ' + fees[v]) : 'TBD'
  if (v) localStorage.setItem('preferredEventType', v)
}
function loadPreferences() {
  const pref = localStorage.getItem('preferredEventType')
  if (pref) {
    const sel = document.getElementById('eventSelect')
    if (sel) sel.value = pref
    const fake = { value: pref }
    showFee(fake)
  }
}
function clearPreferences() {
  localStorage.removeItem('preferredEventType')
  sessionStorage.clear()
  const sel = document.getElementById('eventSelect')
  if (sel) sel.value = ''
  const fee = document.getElementById('feeDisplay')
  if (fee) fee.innerText = 'Free'
}

// Exercise 9: Geolocation for Event Mapping
function findNearby() {
  const out = document.getElementById('geoOutput')
  if (!out) return
  if (!navigator.geolocation) { out.innerText = 'Geolocation not supported'; return }
  out.innerText = 'Locating...'
  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude.toFixed(5)
    const lon = pos.coords.longitude.toFixed(5)
    out.innerText = 'Latitude: ' + lat + ', Longitude: ' + lon
  }, function (err) {
    if (err.code === 1) out.innerText = 'Permission denied for location'
    else if (err.code === 3) out.innerText = 'Timeout getting location'
    else out.innerText = 'Location error: ' + err.message
  }, { enableHighAccuracy: true, timeout: 10000 })
}

// Exercise 6: enlarge gallery image on double click
function enlargeImage(img) {
  if (!img) return
  img.classList.toggle('enlarged')
}

function videoReady() {
  const vmsg = document.getElementById('videoMsg')
  if (vmsg) vmsg.innerText = 'Video ready to play'
}

function updateCharCount() {
  const box = document.getElementById('messageBox')
  const out = document.getElementById('charCount')
  if (box && out) out.innerText = box.value.length
}

// Exercise 11 & 12: Forms and AJAX/Fetch
async function submitRegistration(form) {
  const name = form.elements['fullName'].value
  const email = form.elements['userEmail'].value
  const selectedEvent = form.elements['eventSelection'].value
  if (name.length < 3) { document.getElementById('formFeedback').innerText = 'Name is too short'; return }
  if (!validatePhone()) { document.getElementById('formFeedback').innerText = 'Fix phone before submit'; return }
  document.getElementById('formFeedback').innerText = 'Sending...'
  try {
    // simulate network delay (Exercise 12)
    await new Promise(r => setTimeout(r, 800))
    // simulate network POST
    const payload = { name, email, selectedEvent }
    console.log('Submitting registration payload:', payload)
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
    const j = await res.json()
    console.log('Registration response:', j)
    document.getElementById('formFeedback').innerText = 'Success id:' + j.id
    const out = document.getElementById('confirmOutput')
    if (out) out.value = 'Registered: ' + name + ' for ' + selectedEvent + ' (id ' + j.id + ')'
    form.reset()
    // form cleared — no longer dirty
    isFormDirty = false
    updateCharCount()
  } catch (e) {
    document.getElementById('formFeedback').innerText = 'Send failed'
  }
}

// Exercise 13: Debugging and Testing
// Console logs are present above; use DevTools to set breakpoints on functions like registerUser or submitRegistration

// Exercise 14: jQuery usage note
// Example: $('#registerBtn').click(...) is used as an alternative to addEventListener. jQuery can simplify DOM selectors and effects.
// Benefit of frameworks (React/Vue): component-based architecture, virtual DOM for performance,
// state management, and reusable UI components — making large-scale apps more maintainable.

// Wire up UI on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('regForm')
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      submitRegistration(form)
    })
    form.addEventListener('input', function () { isFormDirty = true })
  }

  const search = document.getElementById('eventSearch')
  if (search) search.addEventListener('keydown', handleSearch)
  const filter = document.getElementById('categoryFilter')
  if (filter) filter.addEventListener('change', filterEvents)
  const phone = document.getElementById('phoneField')
  if (phone) phone.onblur = validatePhone
  const msg = document.getElementById('messageBox')
  if (msg) msg.onkeyup = updateCharCount

  const clearBtn = document.getElementById('clearPrefs')
  if (clearBtn) clearBtn.addEventListener('click', clearPreferences)
  const nearbyBtn = document.getElementById('findNearby')
  if (nearbyBtn) nearbyBtn.addEventListener('click', findNearby)

  loadPreferences()
  updateCharCount()
  loadEventsFromMockApi()
  loadAnnouncementsPromise()

  const video = document.getElementById('promoVideo')
  if (video) video.oncanplay = videoReady

  window.onbeforeunload = function (e) {
    if (isFormDirty) {
      e.preventDefault()
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
      return e.returnValue
    }
  }

  // small jQuery example for exercise 14
  if (typeof $ !== 'undefined') {
    $('#registerBtn').click(function () { console.log('Register button clicked (jQuery handler)') })
  }
})

// Warn user when leaving if the form has unsaved changes (Exercise 7)

