# frozen_string_literal: true

# Node Model
class Node < ApplicationRecord
  belongs_to :parent, class_name: 'Node', optional: true
  has_many :birds, class_name: 'Node', foreign_key: 'parent_id', dependent: :destroy
end
