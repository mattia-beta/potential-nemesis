class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_email( params[:session][:email] )
    if @user and @user.authenticate( params[:session][:password] )
      session[:user_id] = @user.id
      cookies.permanent[:token] = @user.token
      redirect_to user_path( @user )
    else
      redirect_to root_url
    end
  end

end
