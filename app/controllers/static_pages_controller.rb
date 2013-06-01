class StaticPagesController < ApplicationController

  def home
    if cookies[:token] or session[:user_id]
      if current_user.role.include? "user"
        redirect_to user_path( current_user )
      elsif current_user.role.include? "global"
        redirect_to controller: :issues, action: :index
      end
    end
  end

end
