require 'rubygems'
require 'rsolr'

module SolrIndex
  class SolrIndexGenerator < Jekyll::Generator
    safe true
    priority :low
    
    def initialize(config={})
      super(config)
      @solr_indexing_enabled = config['solr_indexing_enabled']
      unless @solr_indexing_enabled
        return
      end
      raise ArgumentError.new "Missing 'solr_indexing_baseurl' configuration." unless config['solr_indexing_baseurl']
      @solr_index_url = config['solr_indexing_baseurl'].dup
      @solr_index_project = !(config['solr_indexing_project'] == nil || config['solr_indexing_project'].empty?) ? config['solr_indexing_project'] : 'default'
      baseurl_conf = config['baseurl']
      @baseurl = baseurl_conf != nil ? baseurl_conf : ''
    end
    
    def generate(site)
      unless @solr_indexing_enabled
        return
      end
      solr = RSolr.connect :url => @solr_index_url

      solr.delete_by_query 'project_s:' + @solr_index_project
      solr.commit

      items = site.pages.dup.concat(site.posts)

      items.each do |item|
        page_url = @baseurl + item.url

        next unless indexable? item

        content = item.content.gsub(%r{</?[^>]+?>}, ' ')
        tags = item.data['tags'] || []

        puts "Indexing #{page_url}"

        solr.add :id=>page_url, :url_s=>page_url, :title_t=>item.data['title'], :category_txt=>item.data['category'], :text_t=>content, :tags_txt=>tags, :project_s=>@solr_index_project
        solr.commit
      end
    end
    
    private
    
    def indexable?(item)
      indexable = item.data['index']
      if indexable == nil || indexable.to_s.empty?
        indexable = true
      end
      indexable
    end
  end
end