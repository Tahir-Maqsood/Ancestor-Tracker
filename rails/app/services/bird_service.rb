class BirdService
  def self.find_birds_for_nodes(node_ids)
    nodes = Node.where(id: node_ids)
    all_nodes = nodes.flat_map { |node| collect_descendants(node) }.uniq
    Bird.where(node_id: all_nodes.map(&:id)).pluck(:id)
  end

  def self.collect_descendants(node)
    descendants = [node]
    node.children.each do |child|
      descendants += collect_descendants(child)
    end
    descendants
  end
end
