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
