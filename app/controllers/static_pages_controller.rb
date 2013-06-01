class StaticPagesController < ApplicationController

  def home
    if cookies[:token] or session[:user_id]
      redirect_to user_path( current_user )
    end
  end

end
