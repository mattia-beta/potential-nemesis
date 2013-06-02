class StaticPagesController < ApplicationController

  def home
    if cookies[:token] or session[:user_id]
      if current_user and current_user.role.include? "user"
        redirect_to controller: :users, action: :show
      elsif current_user and current_user.role.include? "global"
        redirect_to controller: :issues, action: :index
      elsif current_user and current_user.role.include? "local"
        redirect_to controller: :issues, action: :local
      end
    end
  end

end
