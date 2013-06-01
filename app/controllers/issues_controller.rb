class IssuesController < ApplicationController

  def create
    @issue = Issue.new( params[:issue] )
    render_js :created
  end

  def update
    Issue.find( params[:issue][:issue_id] ).update_attributes( params[:issues] )
    render_js :updated
  end

  def destroy
    Issue.destroy( params[:issue_id] )
    reder_js :destroyed
  end

  private

  def render_js ( :response )
    respond_to do |format|
      format.js { render :action => :response }
    end
  end

end
