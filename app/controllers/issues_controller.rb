class IssuesController < ApplicationController


#  load_and_authorize_resource
  def index
    @issues = Issue.all
  end

  def local
    coordinates = Geocoder.search( current_user.zone )
    @issues = Issue.near( [coordinates[0].latitude, coordinates[0].longitude ] ).order( :priority )
  end

  def comment
    issue = Issue.find( params[:comment][:issue_id] ).update_attributes( :comment => params[:comment][:body], :priority => 0 )
    redirect_to action: :local
  end

  def create
    if current_user.issues.new( params[:issue] ).save
       redirect_to user_path current_user
    else
      render_error
    end
  end

  def update
    if Issue.find( params[:edited][:id] ).update_attributes( params[:edited] )
      redirect_to root_url
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
    @issue = current_user.issues.find( params[:issue_id] )
    if @issue.destroy
      render_js :destroyed
    else
      render_error
    end
  end

  def fetch_nearest
    @issues = Issue.near( [ params[:latitude], params[:longitude] ], 40, :units => :km )
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
