class IssuesController < ApplicationController

  def index
  end

  def create
    if @issue = current_user.issues.new( params[:issue] ).save
      render_js :created
    else
      render_error
    end
  end

  def update
    if current_user.issues.find( params[:issue][:issue_id] ).update_attributes( params[:issues] )
      render_js :updated
    else
      render_error
    end
  end

  def destroy
    if current_user.issues.destroy( params[:id] )
      render_js :destroyed
    else
      render_error
    end
  end

  def fetch_nearest
    @issues = Issue.near( [ params[:latitude], params[:longitude] ] )
    respond_to do |format|
      format.js { render :success => true, :json => @issues.to_json( :only => [ :name, :description, :latitude, :longitude ] ) }
    end
  end

  private

  def render_js ( script )
    respond_to do |format|
      format.js { render :action => script }
    end
  end

  def render_error
    respond_to do |format|
      format.js { render :action => :error }
    end
  end

end
