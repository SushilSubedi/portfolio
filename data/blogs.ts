export type BlogPost = {
  title: string
  description: string
  excerpt?: string
  link?: string
  uid: string
  slug?: string
  content: string
  category?: string
  tags?: string[]
  date?: string
  dateFormatted?: string
  updatedAt?: string
  readingTime?: number
  readingLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
  image?: string
  ogImage?: string
  published?: boolean
  featured?: boolean
  series?: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    uid: 'how-to-read-exif-capture-time-from-heic-heif-photos-in-ruby-on-rails',
    title: 'How to Read EXIF Capture Time from HEIC/HEIF Photos in Ruby on Rails',
    description:
      'Learn how to extract EXIF metadata from iPhone HEIC/HEIF photos in Rails using ExifTool, with practical examples for Active Storage integration.',
    category: 'Ruby on Rails',
    date: '2025-10-11',
    dateFormatted: 'October 11, 2025',
    readingTime: 3,
    image: '/images/blogs/exif-heic-cover.png',
    link: 'https://dev.to/sushilsubedi/how-to-read-exif-capture-time-from-heicheif-photos-in-ruby-on-rails-324b',
    tags: ['rails', 'programming', 'ruby', 'webdev'],
    content: `
If you've ever uploaded an iPhone photo and noticed your captured_at field missing, you're not alone. HEIC/HEIF files store metadata differently than JPEGs, and most Ruby EXIF libraries can't read them. Here's how to fix that.

## Quick Summary

- Use ExifTool (through the \`mini_exiftool\` or \`exiftool\` gem), it works with HEIC/HEIF files directly
- You don't need to decode or convert images (\`libheif\` or \`libvips\`) just to read metadata
- Always convert timestamps to UTC and check multiple EXIF date fields for reliability
- When using Active Storage, call \`blob.open\` to access a temporary file path for ExifTool

## Why HEIC/HEIF can be tricky

Here's the issue in plain terms:
- HEIC stores metadata inside QuickTime-style boxes, not the standard EXIF segments used by JPEG
- Most Ruby EXIF libraries (like \`exifr\`) only understand JPEG/TIFF files
- ExifTool is a Perl-based tool that can read just about anything, including HEIC/HEIF, RAW, and Live Photo sidecars

## Setup

Install the ExifTool CLI on your machine/container:

**macOS (Homebrew):**
\`\`\`bash
brew install exiftool
\`\`\`

**Debian/Ubuntu:**
\`\`\`bash
sudo apt-get install -y libimage-exiftool-perl
\`\`\`

**Alpine:**
\`\`\`bash
apk add exiftool
\`\`\`

Then add one of these gems to your Gemfile:

\`\`\`ruby
gem 'exiftool' # lightweight wrapper; also shells out to exiftool
\`\`\`

And install them:

\`\`\`bash
bundle install
\`\`\`

## Reading EXIF data from a file

Here's a simple Ruby method using the \`exiftool\` gem:

\`\`\`ruby
require 'exiftool'

def extract_capture_time(path)
  data = Exiftool.new(path).to_hash # symbolized keys
  raw = data[:date_time_original] || 
        data[:create_date] || 
        data[:media_create_date] || 
        data[:modify_date]
  
  return nil unless raw
  
  case raw
  when Time then raw.utc
  when DateTime then raw.to_time.utc
  else (Time.parse(raw.to_s) rescue nil)&.utc
  end
end
\`\`\`

That's it! ExifTool takes care of all the format quirks, so this works for HEIC, JPEG, and even Live Photos.

## Reading EXIF with Active Storage

When your image lives in Active Storage (e.g., S3 or Disk), just open it temporarily before reading EXIF:

\`\`\`ruby
def extract_capture_time_from_blob(blob)
  blob.open do |file|
    extract_capture_time(file.path)
  end
end
\`\`\`

This downloads the file into a Tempfile, passes its path to ExifTool, and cleans up afterward—no extra libraries required.

## Normalizing captured_at in your models

When you save your capture time, normalize it to UTC and support multiple sources:

\`\`\`ruby
def normalized_captured_at(file_path: nil, client_value: nil)
  exif_time = file_path && extract_capture_time(file_path)
  
  client_time = begin
    case client_value
    when Time then client_value
    when DateTime then client_value.to_time
    when String then Time.iso8601(client_value) rescue Time.parse(client_value)
    end
  rescue ArgumentError
    nil
  end
  
  (exif_time || client_time)&.utc
end
\`\`\`

This way, even if the photo doesn't have EXIF data, you can still fall back to a timestamp sent from the frontend.

## Troubleshooting

**No DateTimeOriginal:** Some devices only set \`CreateDate\` or \`MediaCreateDate\`. Always try fallbacks.

**Nil/empty type from browser:** Client uploads may send \`application/octet-stream\`. Fix on the frontend by inferring a proper MIME type from the filename before direct upload.

**It worked for JPEG but not HEIC:** Ensure you're using ExifTool, not EXIFR, for HEIC files.

## References

- [ExifTool project](https://exiftool.org/)
- [HEIF/HEIC overview](https://nokiatech.github.io/heif/technical.html)

If you'd like to make this reusable, you can wrap the logic into a small service class, \`ImageMetadataExtractor\` that returns either a UTC Time or nil. Once you have this in place, your app can reliably extract \`captured_at\` from any image, regardless of format. 📸

> Read the full article with images on [dev.to](https://dev.to/sushilsubedi/how-to-read-exif-capture-time-from-heicheif-photos-in-ruby-on-rails-324b)
    `,
  },
  {
    uid: 'speed-up-your-images-complete-guide-to-cloudflare-cdn-amazon-s3',
    title: '🚀 Speed Up Your Images: Complete Guide to Cloudflare CDN + Amazon S3',
    description:
      'Learn how to dramatically improve image loading speeds by setting up Cloudflare CDN in front of Amazon S3, with practical Rails integration examples.',
    category: 'DevOps',
    date: '2025-09-20',
    dateFormatted: 'September 20, 2025',
    readingTime: 6,
    image: '/images/blogs/cloudflare-cdn-cover.jpg',
    link: 'https://dev.to/sushilsubedi/speed-up-your-images-complete-guide-to-cloudflare-cdn-amazon-s3-3g62',
    tags: ['aws', 'webdev', 'cdn', 'programming'],
    content: `
So here's the thing, I had this Rails app where images were taking forever to load. Users were complaining, and my AWS bill was climbing. After some research, I set up Cloudflare CDN in front of my S3 bucket, and wow—the difference was night and day.

## Why This Actually Works

Before I get into the how-to, let me quickly explain why this setup is so effective:

When you serve images directly from S3, every single request hits your bucket. A user in Tokyo requesting an image from your US-East bucket? That's a long round trip. A user refreshing the page? Another S3 request and another charge on your AWS bill.

With Cloudflare in front, images get cached at edge locations worldwide. That Tokyo user gets the image from Cloudflare's Tokyo datacenter instead of Virginia. Plus, once an image is cached, you're not paying S3 bandwidth costs for repeated requests.

**What You'll Need:**
- An AWS account with an S3 bucket (or willingness to create one)
- A domain on Cloudflare (free tier works fine)
- About 30 minutes

## Step 1: Setting Up Your S3 Bucket

First, create a new S3 bucket or use an existing one. I called mine \`my-app-images-2024\` but you can name it whatever makes sense.

The tricky part: you need to turn off **Block All Public Access**.

Choose your region based on where most of your users are, or just pick the one closest to you.

## Step 2: The Bucket Policy

You need to add a bucket policy to actually make the images readable. This is the JSON you need to paste in (replace \`my-images-bucket\` with your actual bucket name):

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-images-bucket/*"]
    }
  ]
}
\`\`\`

Go to your bucket → Permissions → Bucket Policy, paste this in, and save. After this, you should be able to access any image in your bucket directly:

\`\`\`
https://my-images-bucket.s3.amazonaws.com/path/to/image.jpg
\`\`\`

**Note:** Test this before moving on - upload a test image and try accessing it via the URL.

## Step 3: Cloudflare CNAME Setup

Now for the good stuff. In your Cloudflare dashboard:

1. Go to DNS
2. Add a CNAME record
3. Set the name to something like \`images\` or \`cdn\`
4. Point it to your S3 bucket: \`my-images-bucket.s3.amazonaws.com\`
5. Make sure the cloud is orange (proxied through Cloudflare) 🟠

Now your images are accessible at \`https://images.yourdomain.com/path/to/image.jpg\` instead of the ugly raw S3 URL.

## Step 4: Caching Rules (Where the Magic Happens)

This is where you actually get the performance benefits. Without proper caching rules, Cloudflare might not cache your images aggressively.

Go to **Rules → Cache Rules** and create a new Cache rule:

- Select **Cache everything** Template
- **Edge Cache TTL:** 1 month (images don't change often)
- **Browser Cache TTL:** 7 days
- **URL pattern:** \`images.yourdomain.com/*\`

I initially set this to cache for just a few hours, but realized that was stupid - images rarely change, so why not cache them for a month?

## Step 5: Cloud Connector (Don't Skip This!)

Okay, I need to be honest - I initially thought Cloud Connector was just extra fluff, but it's actually really important. It handles the technical details that make S3 work properly with Cloudflare.

Here's what Cloud Connector does automatically:
- Fixes the Host header - S3 is picky about headers, and this makes sure they match what your bucket expects
- Routes traffic correctly - Makes sure requests actually reach your bucket

Go to **Rule → Cloud Connector** and click **Create Cloud Connector**.

Select **AWS S3** since that's what we're using.

For the hostname pattern, use a wildcard like \`images.yourdomain.com/*\` since you'll be serving different images from various paths.

**Pro tip:** Double-check that your bucket name matches exactly what you put in the connector. I spent 20 minutes debugging why my images weren't loading, only to realize I had a typo in the bucket name. 🤦‍♂️

## Step 6: Rails Helper (If You're Using Rails)

Here's the Rails helper I wrote to make this work seamlessly with ActiveStorage:

\`\`\`ruby
module ApplicationHelper
  include Pagy::Frontend
  
  def cdn_image_url(attachment_or_blob, **opts)
    blob = attachment_or_blob.is_a?(ActiveStorage::Blob) ? 
           attachment_or_blob : 
           attachment_or_blob&.blob
    return unless blob
    
    base = ENV['CDN_CLOUDFLARE_URL'].presence || 
           Rails.application.routes.url_helpers.rails_blob_url(blob, only_path: false)
    url = "#{base.chomp('/')}/#{blob.key.delete_prefix('/')}"
    
    return url if opts.blank?
    
    params = opts.slice(:width, :height, :quality, :format)
                .map { |k, v| "#{k.to_s[0]}=#{v}" }
    "#{url}?#{params.join('&')}"
  end
end
\`\`\`

Then in your views:

\`\`\`erb
<%= image_tag cdn_image_url(user.avatar, width: 300, quality: 80, format: :webp) %>
\`\`\`

I set the \`CDN_CLOUDFLARE_URL\` in my environment variables, so I can easily switch between development (direct S3) and production (Cloudflare CDN).

## What I Learned the Hard Way

1. **Cache headers matter.** Initially, my images weren't being cached properly because I didn't set up the cache rules correctly.

2. **The first request is still slow.** That's expected - Cloudflare has to fetch from S3 the first time. After that, it's lightning fast.

3. **ActiveStorage signed URLs don't work.** If you're using Rails, you can't just use the built-in signed URLs because they have query parameters that mess with caching. That's why I built the custom helper.

4. **Test with curl.** This command helped me debug caching issues:

\`\`\`bash
curl -I https://images.yourdomain.com/some-image.jpg
\`\`\`

Look for \`cf-cache-status: HIT\` in the response headers.

## Worth the Effort?

Absolutely. This took me about 2-3 hours to set up (including debugging time), and the performance improvement was immediate and dramatic. Plus, it's basically free - Cloudflare's free tier handles this just fine for most applications.

If you're serving images directly from S3, you should definitely do this. Your users will thank you, and your AWS bill will too.

## References

- [Cloudflare Cloud Connector Documentation](https://developers.cloudflare.com/rules/cloud-connector/)
- [Cloudflare CDN Setup Guide](https://hiddify.com/manager/domain-worker-cdn-and-tunneling/How-to-use-Cloudflare-CDN/#site-or-domain-service)

> Read the full article with images on [dev.to](https://dev.to/sushilsubedi/speed-up-your-images-complete-guide-to-cloudflare-cdn-amazon-s3-3g62)
    `,
  },
  {
    uid: 'how-to-rename-files-so-that-git-can-detect-it',
    title: 'How to Rename Files So That Git Can Detect It',
    description:
      'Learn two effective methods to rename files in Git when dealing with case-sensitivity issues, ensuring your changes are properly tracked in the repository.',
    category: 'Git',
    date: '2022-01-29',
    dateFormatted: 'January 29, 2022',
    readingTime: 4,
    image: '/images/blogs/git-rename-cover.jpeg',
    link: 'https://dev.to/sushilsubedi/how-to-rename-files-so-that-git-can-detect-it-2213',
    tags: ['javascript', 'git', 'webdev', 'codenewbie'],
    content: `
Renaming files on **git** can be really painful to deal with. Git is case insensitive, so we can't rename the file and hope for them to be updated in the **remote repository**. It can also create all sorts of **problems** for yourself and your team.

Today, I will point down a step by step process to solve this particular problem.

## Problem

Let's discuss what happens when you manually try to rename \`Containers\` to \`container\`. Also, keep a close eye on the git lens change in sidebar.

When we manually change the files name from \`uppercase\` to \`lowercase\`, git wasn't able to detect it. Let's see if our remote repository also has the same naming conversion problem after we push the code.

It seems the \`git\` wasn't able to detect the case-sensitive changes.

Let's see how we can solve the problem and make \`git\` detect our file changes.

## Solution

There could be multiple ways we could solve case-sensitive problems and we would use two different ways to solve the problem. Let's move on to our first solution.

### Method 1: Using git-mv command

\`\`\`bash
git mv <your_file_name> <temporary_file_name>
git mv <temporary_file_name> <new_file_name>
\`\`\`

Let's make sure we have navigated to file location before using the above command.

> The above command will delete the file or folder and add a new one with the same content. You can achieve the same facility by deleting the file and adding a new one with the same content. \`Git\` facilitates the process as you don't need to manually delete a file.

It will work on both folder and files cases.

Let's use the same command on other remaining files as well.

**Example: Logo.svg to logo.svg**

**Example: App.js to app.js**

After renaming the above files, we should commit and push the changes to the remote repository.

**Result:**

We finally made the changes on the remote repository as well. And it worked!

### Method 2: Manual Renaming with Extra Step

This method will be a little different than the previous one. We are going to **manually** change the name but we have to add an extra symbol or letter to it. Don't worry, I will explain it more so that you can understand how it works.

Let's break down the process into two different steps:

**Step A:** In the first step, we are going to rename \`Containers\` to \`containers-1\`. I have renamed it \`containers-1\`, so that I will have zero confusion in the next step. Although you can rename with whatever you want, I will suggest a name with more readability.

> As we could see above, \`git\` will detect the changes as a given folder \`Containers\` was deleted and another new folder \`containers-1\` is added but reality is we only changed the name of the folder.

Let's make the changes to other files as well: \`App.js\` to \`app-1.js\` and \`Logo.svg\` to \`logo-1.svg\`

Before moving to the next step, we should commit our changes so that our changes are saved in our local device.

\`\`\`bash
git add .
git commit -m "temporary name change"
\`\`\`

**Step B:** In this step, we will follow the same exact process but this time we rename the file to the exact name which we want. In our case, it will be \`containers-1\` to \`containers\`. Let's make the changes with other files as well: \`app-1.js\` to \`app.js\`, \`logo-1.svg\` to \`logo.svg\`.

> After you change the name, we have to commit the changes and push it to remote repository.

\`\`\`bash
git add .
git commit -m "Manually changing name"
git push origin master
\`\`\`

**Result:**

We successfully changed our files and folder names in our local system as well as remotely. It worked!

- \`Containers\` to \`containers\`
- \`App.js\` to \`app.js\`
- \`Logo.svg\` to \`logo.svg\`

## To Summarize

Both methods are effective and work with all scenarios. You can use any method as you prefer. And if you have a different approach which can solve this problem much easier, please do feel free to share it.

> Read the full article with images on [dev.to](https://dev.to/sushilsubedi/how-to-rename-files-so-that-git-can-detect-it-2213)
    `,
  },
  {
    uid: 'create-gitlab-pr-template',
    title: 'Create GitLab PR Template in 5 Simple Steps',
    description:
      'Learn how to create standardized pull request templates in GitLab to improve team collaboration and save time.',
    category: 'GitLab',
    date: '2024-07-01',
    dateFormatted: 'July 1, 2024',
    readingTime: 8,
    image: '/images/blogs/create_template.png',
    link: 'https://dev.to/sushilsubedi/create-gitlab-pr-template-5gmp',
    content: `
For any company projects or GitLab repository, we need to make sure all the processes to contribute should be standardized. So, maintaining a proper pull request standard is an important way. It will save time and energy for you and your team members.

It also helps new team members be able to show the standard and easily onboard themselves to the team. The best part of creating a Pull Request (Merge Request) template in GitLab is we can update it anytime and it can be configured in just 5 steps.

<BlogImage 
  src="/images/blogs/merge-request-folder.png" 
  alt="GitLab folder structure showing .gitlab/merge_request_templates"
  caption="Creating the .gitlab/\`merge_request_templates\` folder structure"
/>

---

## Steps to create a PR template in GitLab:

### 1. Create a folder \`.gitlab/\`merge_request_templates\` in your project root:

Navigate to your project root and create a folder name as \`.gitlab\` then we also need to add another folder inside the \`.gitlab\` as \`merge_request_templates\`.

**NOTE:** We need to create a \`.md\` file and name of the file should be same name of the template you want it to appear in your GitLab repository.

We can see that I have created a file name called \`default.md\` because I want to have a template name as \`default\`.

### 2. Update default.md:

Now, let's update the content inside the \`default.md\` as below:

\`\`\`markdown
## Trello Card Link:

- Link of a Trello card (we use [Trello](https://trello.com) for Project Management) which was assigned for completing the feature.

## Tasks Done: (list of tasks completed)

- What did you complete in this PR? Mention a list of them

## Tasks Remaining: (List of tasks remaining to be implemented)

- What is remaining to be implemented in this PR? Mention a list of them 

## Steps to test feature:
- How can we test the feature we implemented in this PR? You could mention steps to test it.

## Screenshots:

(if your changes has any UI updates, include screenshot of the changes)
\`\`\`

As I want my fellow developers to add [Trello](https://trello.com) card link assigned to them, add what they have completed, remaining, how can we test it and screenshots if possible.

This is the template format we use in [Truemark Technology](https://www.truemark.dev/) which helps the person who is reviewing the PR know what feature they should be reviewing, link to feature description if they have any confusions and what feature is implemented in this PR.

### 3. Commit and push:

Let's commit the code and push the change to our default branch which in our case is \`develop\`.

\`\`\`bash
git add .
git commit -m "create new template"
git push origin develop
\`\`\`

### 4. Create a new branch to verify new template:

Let's follow below steps to verify new template:

- Checkout to a branch called \`check-template\`:
  \`\`\`bash
  git checkout -b check-template
  \`\`\`

- Create a dummy file called \`test.txt\` and add some content:
  \`\`\`bash
  echo "This is a test content for checking my new PR template in GitLab" >> test.txt
  \`\`\`

- Add new changes and commit:
  \`\`\`bash
  git add .
  git commit -m "Added test.txt to test PR template in GitLab"
  git push origin check-template
  \`\`\`

### 5. Create a merge request:

#### Choose a template:

Let's create a merge request and set the target branch to \`develop\` branch.

**Note:** Make sure we have set default branch as develop.

To set the default branch from **master** to **develop**, follow these steps:
- Select **Repository** from **Settings**
- Select **develop** from the list of branches and click on **Save Changes**

We need to create a merge request by selecting \`Merge Requests\` and click on \`New Merge Request\`. After that we need to select from the template list.

As we can see, \`default\` as our template name.

<BlogImage 
  src="/images/blogs/default-pr.png" 
  alt="GitLab merge request showing template selection"
  caption="Selecting the PR template when creating a merge request"
/>

#### Edit the template:

In this step, we will update the selected template with our actual PR information, then click **Create Merge Request**.

✅ We have successfully created a merge request using our template! 🎉🎉🎉

---

## Conclusion:

I hope this article helps to create a standard format for your team. Thank you so much for reading my blog! I really appreciate it! 👏

> Read the full article with images on [dev.to](https://dev.to/sushilsubedi/create-gitlab-pr-template-5gmp)
    `,
  },
]
