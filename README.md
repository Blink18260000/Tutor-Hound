# TutorHound

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://tutorhound.herokuapp.com

## Minimum Viable Product

TutorHound is a web application inspired by TaskRabbit built using Ruby on Rails
and React.js. TutorHound allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
  - [ ] Client
  - [ ] Tutor
- [ ] Log in / Log out
- [ ] Client
  - [ ] Create Jobs
  - [ ] View Scheduled Jobs
- [ ] Tutor
  - [ ] View Jobs Within Region
    - [ ] Accept Jobs
  - [ ] View Scheduled Jobs
  - [ ] Set Qualifications

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] create `Tutor` model
- [ ] authentication
- [ ] user/tutor signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Jobs Model, API, and basic APIUtil (1.5 days)

**Objective:** Jobs can be created, read, edited and destroyed through
the API.

- [ ] create `Job` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for jobs (`JobsController`)
- [ ] jBuilder views for jobs
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (2 days)

**Objective:** Jobs can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement client interface, building out the flux loop as needed.
  - [ ] `JobsIndex`
  - [ ] `JobsIndexMainItem`
  - [ ] `JobsIndexSubItem`
  - [ ] `JobCreationSidebar`
  - [ ] `JobForm`
  - [ ] `JobConfirmation`
  - [ ] `ClientJob`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Tutors (1.5 days)

**Objective:** Tutors can search available and qualified jobs for work.

- build out API, Flux loop, and components for:
  - [ ] accepting jobs as a tutor
  - [ ] completing jobs
  - [ ] viewing job schedule
- Use CSS to style new views

### Phase 6: Styling Cleanup and Seeding (2.5 days)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] View jobs on calendar
- [ ] Pagination / infinite scroll for Jobs Index
- [ ] Set reminders on jobs
- [ ] Clients can "favorite" tutors
- [ ] Multiple sessions
