# frozen_string_literal: true

# Node Model
class Node < ApplicationRecord
  belongs_to :parent, class_name: 'Node', optional: true
  has_many :birds, class_name: 'Node', foreign_key: 'parent_id', dependent: :destroy

  def self.ancestry_info(first_node:, second_node:)
    NodeService.info(first_node: first_node, second_node: second_node)
  end

  def ancestors
    NodeService.ancestors(self)
  end
end
