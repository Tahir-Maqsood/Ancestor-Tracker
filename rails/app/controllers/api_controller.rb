# frozen_string_literal: true

# API Controller
class ApiController < ApplicationController
  def common_ancestor
    node1 = find_node(params[:a])
    node2 = find_node(params[:b])
    data = Node.task(node1: node1, node2: node2)
    render json: { data: data }
  rescue ActiveRecord::RecordNotFound => e
    render json: { error: e.message }, status: :not_found
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def birds
    ids = parse_ids(params[:ids])
    data = gather_birds_data(ids)
    render json: { data: data }
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def find_node(id)
    Node.find(id)
  end

  def parse_ids(ids_param)
    return [] unless ids_param.present?

    ids_param.split(',').map(&:to_i)
  end

  def gather_birds_data(ids)
    ids.each_with_object([]) do |id, result|
      node = find_node(id)
      result << { node: node.id, birds: node.birds.map(&:id) }
    rescue ActiveRecord::RecordNotFound => e
      result << { error: "Node with id #{id} not found" }
    end
  end
end
