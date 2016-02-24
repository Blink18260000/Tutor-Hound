class Api::JobsController < ApplicationController
  def index
    @jobs = Job.find_by("region_id", params[:regionId])
  end

  def create
    @job = Job.new(job_params)

    if @job.save
      render json: @job
    end
      render json: @job.errors.full_messages, status: 422
    end
  end

  private
  def job_params
    params.require(:job).permit(
      :client_id, :tutor_id, :date, :test_id, :completed
    )
  end
end
