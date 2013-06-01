PotentialNemesis::Application.routes.draw do

    root to: "static_pages#home"
  get "issues/fetch" => "issues#fetch_nearest"
    resources :users
    resources :issues
    resources :sessions

  get "sessions/new" => "sessions#new"
  post "sessions/create" => "sessions#create"

end
