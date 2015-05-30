require 'sinatra'
require 'sinatra/contrib/all' if development?
require 'pry'
require 'pg'

# root to /videos
get "/" do
  redirect to("/videos")
end

get '/videos' do
  sql = "select * from videos"
  @videos = run_sql(sql)
  # check if it is a ajax request as opposed to HTML!!
  if request.xhr?
    # convert the PG object into an array, then convert the array
    # to JSON to send back as 'response' variable?
    json @videos.to_a
  else
    erb :index
  end
end




# # new method (create step 1/2)
# get "/videos/new" do
#   erb :new
# end

# # create method (step 2/2)
# post "/videos" do
#   artist = params[:artist]
#   title = params[:title]
#   description = params[:description]
#   category = params[:category]
#   genre = params[:genre]
#   url = params[:url]
#   # views = 0

#   sql = "INSERT INTO videos (artist, title, description, category, genre, url, views) VALUES (#{sql_string(artist)}, #{sql_string(title)}, #{sql_string(description)}, '#{category}','#{genre}', '#{url}', 0);"
#   run_sql(sql)
#   redirect to("/videos")
# end

# # show method (show one video)
# get "/videos/:id" do
#   sql = "UPDATE videos SET views=(views + 1) WHERE id='#{params[:id]}';"
#   run_sql(sql)
#   sql = "SELECT * FROM videos WHERE id=#{params[:id]}"
#   @video = run_sql(sql).first
#   erb :show
# end

# # edit method (step 1/2)
# get "/videos/:id/edit" do
#   sql = "SELECT * FROM videos WHERE id=#{params[:id]}"
#   @video = run_sql(sql).first
#   erb :edit
# end

# # update method (step 2/2)
# post "/videos/:id" do
#   artist = params[:artist]
#   title = params[:title]
#   description = params[:description]
#   category = params[:category]
#   genre = params[:genre]
#   url = params[:url]

#   sql = "UPDATE videos SET artist=#{sql_string(artist)}, title=#{sql_string(title)}, description=#{sql_string(description)}, url='#{url}', category='#{category}', genre='#{genre}' WHERE id='#{params[:id]}';"
#   run_sql(sql)
#   redirect to("/videos")
# end

# # delete method
# get "/videos/:id/delete" do
#   sql = "DELETE FROM videos where id=#{params[:id]}"
#   run_sql(sql)
#   redirect to("/videos")
# end

# #######
# # method to pass the sql statements into sql
def run_sql(sql)
  conn = PG.connect(dbname: "memetube", host: "localhost")
  begin
    result = conn.exec(sql)
  ensure
    conn.close
  end
  result
end

# # method to ensure sql can accept text with single quotes when adding/editing videos
def sql_string(value)
  "'#{value.gsub("'", "''")}'"  
end