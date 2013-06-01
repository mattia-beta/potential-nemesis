class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user

  private

  def current_user
    if session[:user_id]
      @current_user ||= User.find( session[:user_id] )
    elsif !cookies[:token].nil?
      @current_user ||= User.find_by_token( cookies[:token] )
    else
      render root_url
    end
  end

end
