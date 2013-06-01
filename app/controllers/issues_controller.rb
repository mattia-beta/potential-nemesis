class IssuesController < ApplicationController


  #load_and_authorize_resource
  def index
    @issues = Issue.all
  end


  def create
    if @issue = current_user.issues.new( params[:issue] ).save
      render_js :created
    else
      render_error
    end
  end


  def update_priority
    if Issue.find( params[:issue][:issue_id] ).update_attributes( :priority => params[:issue][:priority] )
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
    render :json => @issues.to_json
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
