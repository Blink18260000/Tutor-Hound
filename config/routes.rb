Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  get '/app', to: 'static_pages#root'

  get '/users/guest', to: 'users#guest'
  delete '/api/users', to: 'api/users#destroy'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index]
    patch '/users/', to: 'users#update'
    put '/users/', to: 'users#update'
    resources :tutors, only: [:index, :create, :update]
    delete '/tutors/', to: 'tutors#destroy'
    resources :jobs, only: [:index, :show, :create, :update, :destroy]
    patch '/jobs/accept/:id', to: 'jobs#accept'
    put '/jobs/accept/:id', to: 'jobs#accept'
    patch '/jobs/decline/:id', to: 'jobs#decline'
    put '/jobs/decline/:id', to: 'jobs#decline'
    resources :tests, only: [:index]
    resources :regions, only: [:index]
    resources :quals, only: [:index, :create, :destroy]
  end
end
