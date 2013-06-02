class SessionsController < ApplicationController

    def new
    end

    def create
        @user = User.find_by_email(params[:session][:email])
        if @user and @user.authenticate(params[:session][:password])
            session[:user_id] = @user.id
            cookies.permanent[:token] = @user.token
            if current_user and current_user.role.include? "user"
                redirect_to controller: :users, :action => :show
            elsif current_user and current_user.role.include? "global"
                redirect_to controller: :issues, action: :index
            elsif current_user and current_user.role.include? "local"
              redirect_to controller: :issues, action: :local
            end
        else
            redirect_to root_url
        end
    end

    def destroy
        cookies.delete(:token)
        session[:user_id] = nil
        redirect_to root_url
    end

end
