Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  get '/app', to: 'static_pages#root'

  get '/users/guest', to: 'users#guest'

  namespace :api, defaults: { format: :json } do
    resources :jobs, only: [:index, :show, :create]
  end
end
