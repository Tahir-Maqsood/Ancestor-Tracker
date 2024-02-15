# app/services/node_service.rb
class NodeService
  def self.ancestors_records(first_node:, second_node:)
    return same_node_info(first_node) if first_node == second_node

    first_node_ancestors = ancestors(first_node)
    second_node_ancestors = ancestors(second_node)

    lowest_common_ancestor = lowest_common_ancestor(first_node_ancestors: first_node_ancestors, second_node_ancestors: second_node_ancestors)

    return { root: nil, lowest_common_ancestor: nil, depth: nil } if lowest_common_ancestor.nil?

    root = first_node_ancestors.last
    depth = first_node_ancestors.index(root) - first_node_ancestors.index(lowest_common_ancestor) + 1

    { root: root, lowest_common_ancestor: lowest_common_ancestor, depth: depth }
  end

  def self.same_node_ancestors_records(node)
    node_ancestors = ancestors(node)
    lowest_common_ancestor = node.id
    root = node_ancestors.last
    depth = (node_ancestors.index(root) - node_ancestors.index(lowest_common_ancestor)) + 1

    { root: root, lowest_common_ancestor: lowest_common_ancestor, depth: depth }
  end

  def self.lowest_common_ancestor(first_node_ancestors:, second_node_ancestors:)
    (first_node_ancestors & second_node_ancestors).first
  end

  def self.ancestors(node)
    current_node = node
    ancestors = [current_node.id]
    while current_node.parent && current_node.parent != current_node
      current_node = current_node.parent
      ancestors << current_node.id
    end
    ancestors
  end
end
