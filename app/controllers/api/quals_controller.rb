class Api::QualsController < ApplicationController
  def index
    @quals = Qual.joins(:tutor).where("user_id = " + current_user.id.to_s)

    #If the result is exactly one qual, arrayify it so the json renders properly
    if @quals.class == Qual
      @quals = [@quals]
    end
  end

  def create
    @qual = Qual.new(qual_params)

    @qual.tutor_id = current_user.tutor.id

    if @qual.save
      render :show
    else
      render json: @qual.errors.full_messages, status: 422
    end
  end

  def destroy
    @qual = Qual.find_by_id(params[:id])

    if @qual && current_user.tutor.id == @qual.tutor_id
      @qual.destroy
    end

    render :show
  end

  private
  def qual_params
    params.require(:qual).permit(
      :test_id
    )
  end
end
