# frozen_string_literal: true

Rails.application.routes.draw do
  get '/common_ancestor', to: 'api#common_ancestor'
  get '/birds', to: 'api#birds'

  get 'up' => 'rails/health#show', as: :rails_health_check
end
