class NodeService
  def self.find_common_ancestor(node_a, node_b)
    return {root_id: nil, lowest_common_ancestor: nil, depth: nil} if node_a.nil? || node_b.nil?

    path_a = path_to_root(node_a)
    path_b = path_to_root(node_b)

    common_ancestor = (path_a & path_b).first
    return {root_id: nil, lowest_common_ancestor: nil, depth: nil} unless common_ancestor

    depth = path_to_root(common_ancestor).length
    {root_id: path_a.last.id, lowest_common_ancestor: common_ancestor.id, depth: depth}
  end

  def self.path_to_root(node)
    path = []
    while node
      path << node
      node = node.parent
    end
    path
  end
end
