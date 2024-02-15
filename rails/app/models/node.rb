# frozen_string_literal: true

# Node Model
class Node < ApplicationRecord
  belongs_to :parent, class_name: 'Node', optional: true
  has_many :birds, class_name: 'Node', foreign_key: 'parent_id', dependent: :destroy

  def ancestors
    current_node = self
    ancestors = [current_node.id]
    loop do
      current_node = current_node.parent
      ancestors << current_node.id
      break if current_node.parent.nil?
    end
    ancestors
  end

  def self.task(node1:, node2:)
    return handle_same_node(node1) if node1 == node2

    node1_ancestors = node1.ancestors
    node2_ancestors = node2.ancestors

    lca = lca(node1_ancestors: node1_ancestors, node2_ancestors: node2_ancestors)

    return { root: nil, lca: nil, depth: nil } if lca.nil?

    root = node1_ancestors.last
    depth = node1_ancestors.index(root) - node1_ancestors.index(lca) + 1

    { root: root, lca: lca, depth: depth }
  end

  def self.handle_same_node(node)
    node_ancestors = node.ancestors
    lca = node.id
    root = node_ancestors.last
    depth = (node_ancestors.index(root) - node_ancestors.index(lca)) + 1

    { root: root, lca: lca, depth: depth }
  end

  def self.lca(node1_ancestors:, node2_ancestors:)
    (node1_ancestors & node2_ancestors).first
  end
end
