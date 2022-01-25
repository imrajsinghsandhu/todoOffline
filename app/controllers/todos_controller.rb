class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    # using the .find method allows us to query 
    # the specific id we need
    @todos = Todo.find(params[:id])
    render json: @todos
  end

  def create
    todo = Todo.create(todo_params)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_params)
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end

  private 
    # I believe in here you can add the option for the tags 
    def todo_params
      params.permit(:title, :done, :id, :tag)
    end
end
