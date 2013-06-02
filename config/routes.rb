PotentialNemesis::Application.routes.draw do

  root to: "static_pages#home"
  get "issues/fetch" => "issues#fetch_nearest"
  post "issues/update_priority" => "issues#update_priority"
  post "issues/update" => "issues#update"
  post "issues/create" => "issues#create"
  get "issues/destroy" => "issues#destroy"
  get "issues/index" => "issues#index"
  post "issues/comment" => "issues#comment"
  get "users/show" => "users#show"
  post "users/create" => "users#create"

  # local routes
  get "issues/local" => "issues#local"

#  resources :users
  # sessions routes
  get "sessions/new" => "sessions#new"
  post "sessions/create" => "sessions#create"
  get "sessions/destroy" => "sessions#destroy"

end
