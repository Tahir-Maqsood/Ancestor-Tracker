# frozen_string_literal: true

# NodesController
class NodesController < ApplicationController
  def common_ancestor
    first_node = get_node(params[:a])
    second_node = get_node(params[:b])
    data = NodeService.ancestors_records(first_node: first_node, second_node: second_node)
    render json: { data: data }
  end

  def birds
    ids = parse_ids(params[:ids])
    data = gather_birds_data(ids)
    render json: { data: data }
  end

  private

  def parse_ids(ids_param)
    return [] unless ids_param.present?

    ids_param.split(',').map(&:to_i)
  end

  def gather_birds_data(ids)
    nodes = Node.includes(:birds).where(id: ids)
    nodes.map { |node| { node: node.id, birds: node.birds.pluck(:id) } }
  end
end
