PotentialNemesis::Application.routes.draw do

  root to: "static_pages#home"
  get "issues/fetch" => "issues#fetch_nearest"
  post "issues/update" => "issues#update"
  resources :users
  resources :issues

  # sessions routes
  get "sessions/new" => "sessions#new"
  post "sessions/create" => "sessions#create"
  get "sessions/destroy" => "sessions#destroy"

end
