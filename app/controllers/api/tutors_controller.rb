class Api::TutorsController < ApplicationController
  def index
    @tutor = Tutor.find_by(user_id: current_user.id)
    if @tutor
      render :show
    else
      render json: {}
    end
  end

  def create
    @tutor = Tutor.new(tutor_params)
    @tutor.user_id = current_user.id

    if @tutor.save
      render :show
    else
      render json: @tutor.errors.full_messages, status: 422
    end
  end

  def update
    @tutor = Tutor.find_by_id(params[:id])
    if @tutor.client_id == current_user.id
      @tutor.update(tutor_params)
    end
    render :show
  end

  def destroy
    @tutor = Tutor.find_by(user_id: current_user.id)
    @tutor.destroy
    render nothing: true
  end

  private
  def tutor_params
    params.require(:tutor).permit(
      :f_name, :l_name
    )
  end
end
