class UsersController < ApplicationController

    def new
        @user = User.new
    end

    def create
        @user = User.create(params[:user])
        if @user.save
           redirect_to @user
        else
           render 'new'
        end
    end


    def edit
        @user = User.find(params[:id])
    end


    def update
        if @user.update_attributes(params[:user])
            redirect_to @user, :notice =>  "Profilo aggiornato!"
        else
            flash[:notice] = "Non aggiornato.."
            render 'edit'
        end
    end


    def destroy

    end


    def show
        @user = User.find(params[:id])
    end

end
