#!/usr/bin/env ruby

require 'bundler/setup'

require 'nokogiri'
require 'httparty'

response = HTTParty.get('https://www.produce.co.nz/seasonality-chart/')

doc = Nokogiri::HTML5(response.body)

TABLES = [
  'Vegetables',
  'Specialty vegetables',
  'Fruits',
  'Berries',
  'Stone fruits',
  'Specialty fruits',
  'Specialty flowers',
  'Herbs'
]

tables = TABLES.zip(doc.css('.custom-table table').to_a)

data = tables.flat_map do |(group, table)|
  months = table.children[1].children[3].children.select do |x|
    x.name == 'td' && x.text !~ /\A[\s\n]*\z/
  end
  months.map! { |x| x.text.strip.downcase }

  rows = table.children[1].children.drop(4).select { |x| x.name == 'tr' }

  content = rows.map do |row|
    cells = row.children.select { |x| x.name == 'td' && x.text !~ /\A[\s\n]*\z/ }
    produce = cells[0].text.strip.downcase.gsub(/(?<=\b)[a-z]/, &:upcase)
    columns = row.children
                 .select { |x| x.name == 'td' }.drop(1)
    columns.map! do |x|
      if x['class'] =~ /purple/
        'unavailable'
      else
        [
          x['class'] =~ /green/ ? 'available' : 'limited',
          x.children.find { |y| y.name == 'img' } ? 'imported' : 'local'
        ].compact.join('.')
      end
    end

    {
      name: produce,
      group:,
      months: months.zip(columns).to_h
    }
  end
end

puts JSON.pretty_generate(data)
