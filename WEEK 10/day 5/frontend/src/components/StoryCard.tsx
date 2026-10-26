import { ArrowUpRight, MessageCircle, Users } from 'lucide-react';
import type { Story } from '@story/types';
import { Link } from 'react-router-dom';

const colors = ['story-card-moss', 'story-card-rose', 'story-card-amber', 'story-card-blue'];

export function StoryCard({ story, index }: { story: Story; index: number }) {
  const excerpt = story.content.length > 190 ? `${story.content.slice(0, 190).trimEnd()}…` : story.content;

  return (
    <article className={`story-card ${colors[index % colors.length]}`}>
      <div className="story-card-top"><span className="story-label">A STORY IN PROGRESS</span><span className="story-number">{String(index + 1).padStart(2, '0')}</span></div>
      <Link className="story-card-link" to={`/stories/${story.id}`}>
        <h3>{story.title}</h3>
        <p className="story-excerpt">{excerpt}</p>
      </Link>
      <div className="story-card-bottom">
        <div className="story-author"><span className="avatar small">{story.authorDisplayName.slice(0, 1).toUpperCase()}</span><span>by {story.authorDisplayName}</span></div>
        <div className="story-card-meta"><span title={`${story.contributors.length} collaborators`}><Users size={14} /> {story.contributors.length}</span><span title={`${story.commentCount} comments`}><MessageCircle size={14} /> {story.commentCount}</span><Link to={`/stories/${story.id}`} aria-label={`Open ${story.title}`}><ArrowUpRight size={17} /></Link></div>
      </div>
    </article>
  );
}