class Api::TestsController < ApplicationController
  def index
    @tests = Test.order("name")
  end
end
