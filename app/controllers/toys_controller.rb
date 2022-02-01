class ToysController < ApplicationController
  wrap_parameters format: []
rescue_from ActiveRecord::RecordInvalid, with: :unprocessable

  def index
    toys = Toy.all
    render json: toys
  end

  def create
    toy = Toy.create!(toy_params)
    render json: toy, status: :created
  end

  def update
    toy.update(toy_params)
    render json: toy 
  end

  def destroy
    toy.destroy
    head :no_content
  end

  private
  
  def toy_params
    params.permit(:name, :image, :likes)
  end

  def toy
    Toy.find(params[:id])
  end

  def unprocessable(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
