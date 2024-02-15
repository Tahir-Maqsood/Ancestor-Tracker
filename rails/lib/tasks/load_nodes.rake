# namespace :load do
#   desc 'Load nodes from CSV'
#   task nodes: :environment do
#     require 'csv'
#     csv_file = Rails.root.join('db', 'data', 'nodes.csv')
#     CSV.foreach(csv_file, headers: true) do |row|
#       Node.create(node_id: row['id'], parent_id: row['parent_id'])
#     end
#   end
# end




namespace :load do
  desc 'Load nodes from CSV'
  task nodes: :environment do
    require 'csv'
    csv_file = Rails.root.join('db', 'data', 'nodes.csv')
    CSV.foreach(csv_file, headers: true) do |row|
      Node.create(id: row['id'])
    end

    CSV.foreach(csv_file, headers: true) do |row|
      Node.find(row['id']).update(parent_id: row['parent_id'])
    end
  end
end
