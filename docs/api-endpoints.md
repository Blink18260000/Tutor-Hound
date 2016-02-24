# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Tutors

- `GET /tutors/new`
- `POST /tutors`
- `PATCH /tutors`


### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Jobs

- `GET /api/jobs`
  - Jobs index/search
  - Accepts `tutor` flag query param to either list qualified jobs or user's current jobs
  - Only shows jobs valid to view
- `POST /api/jobs`
- `GET /api/jobs/:id`
- `PATCH /api/jobs/:id`
- `DELETE /api/jobs/:id`

### Qualifications

- A tutors's qualifications will be included in the tutor show template
- `GET /api/:user_id/quals`
- `POST /api/:user_id/quals`: add qualification to tutor by name
- `DELETE /api/:user_id/quals/:qual_id`: remove qualification from tutor
