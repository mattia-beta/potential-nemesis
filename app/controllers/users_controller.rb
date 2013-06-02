class UsersController < ApplicationController
  #load_and_authorize_resource
    def new
        @user = User.new
    end

    def create
        @user = User.create(params[:user])
        if @user.save
          session[:user_id] = @user.id
          redirect_to action: :show
        else
           render 'new'
        end
    end


    def edit
      current_user
    end


    def update
        if @user.update_attributes(params[:user])
            redirect_to action: :show, :notice =>  "Profilo aggiornato!"
        else
            flash[:notice] = "Non aggiornato.."
            render 'edit'
        end
    end


    def destroy

    end


    def show
    end

end
