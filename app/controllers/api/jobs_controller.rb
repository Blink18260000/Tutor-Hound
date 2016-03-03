class Api::JobsController < ApplicationController
  def index
    #get all available jobs for the current user (a tutor)
    if params[:requestType] == "available"
      # @jobs = Job.includes(:tutor, :test, :client).where(
      #   "region_id = ? AND tutor_id IS NULL AND client_id <> ?",
      #   current_user.region_id, current_user.id
      # )
      @jobs = current_user.available_jobs.joins(:client).where(
        "region_id = ? AND jobs.tutor_id IS NULL AND client_id <> ?",
        current_user.region_id, current_user.id
      )

    #get all jobs where the current user is listed as the tutor
    elsif params[:requestType] == "tutor"
      @jobs = Job.includes(:tutor, :test).where(tutor_id: current_user.id)

    #get all jobs where the current user is listed as the client
    else
      @jobs = Job.includes(:tutor, :test).where(client_id: current_user.id)
    end

    #If the result is exactly one job, arrayify it so the json renders properly
    if @jobs.class == Job
      @jobs = [@jobs]
    end
  end

  def create
    @job = Job.new
    @job.client_id = current_user.id
    @job.tutor_id = nil
    @job.test_id = job_params[:test_id]
    @job.date = job_params[:date]
    @job.completed = nil

    if @job.save
      render :show
    else
      render json: @job.errors.full_messages, status: 422
    end
  end

  def show
    @job = Job.find_by_id(params[:id])
  end

  def update
    @job = Job.find_by_id(params[:id])
    if @job.client_id == current_user.id
      @job.update(job_params)
    end
    render :show
  end

  def destroy
    @job = Job.find_by_id(params[:id])
    if @job.client_id == current_user.id
      @job.destroy
    end
    render :show
  end

  private
  def job_params
    params.require(:job).permit(
      :client_id, :tutor_id, :date, :test_id, :completed
    )
  end
end
