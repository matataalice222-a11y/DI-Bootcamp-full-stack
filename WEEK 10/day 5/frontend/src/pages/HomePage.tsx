import { useState, type FormEvent } from 'react';
import { ArrowRight, BookPlus, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ErrorNotice, getErrorMessage, Loading } from '../components/Feedback';
import { StoryCard } from '../components/StoryCard';
import { useCreateStoryMutation, useGetStoriesQuery } from '../services/storyApi';

export function HomePage() {
  const [ownOnly, setOwnOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createStory, createState] = useCreateStoryMutation();
  const { data, isLoading, error } = useGetStoriesQuery(ownOnly);
  const user = useAppSelector((state) => state.auth.user);
  const visibleStories = (data?.stories ?? []).filter((story) =>
    `${story.title} ${story.content} ${story.authorDisplayName}`.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createStory({ title, content }).unwrap();
      setTitle('');
      setContent('');
      setComposerOpen(false);
    } catch {
      return;
    }
  }

  return (
    <>
      <section className="home-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" /> A SHARED STORYBOOK</p>
          <h1>Words are better<br /><em>when shared.</em></h1>
          <p className="home-intro">An open table for half-finished ideas, passing-the-page stories, and the people who bring them to life.</p>
          <div className="home-byline"><span className="avatar">{user?.displayName.slice(0, 1).toUpperCase()}</span><span>Welcome to the table, <strong>{user?.displayName}</strong></span></div>
        </div>
        <div className="home-art" role="img" aria-label="Open book and handwritten story notes"><span>PASS THE PAGE</span></div>
      </section>

      <section className="stories-section" aria-labelledby="stories-heading">
        <div className="section-head">
          <div><p className="eyebrow">THE COMMUNITY SHELF</p><h2 id="stories-heading">Stories in the making<span>.</span></h2></div>
          <button className="primary-button new-story-button" type="button" onClick={() => setComposerOpen(!composerOpen)}><BookPlus size={17} /> Start a story</button>
        </div>

        {composerOpen ? <form className="story-composer" onSubmit={handleCreate}>
          <div className="composer-heading"><div><span className="section-index">NEW PAGE</span><h3>Give an idea a beginning.</h3></div><button type="button" className="text-button" onClick={() => setComposerOpen(false)}>Cancel</button></div>
          {createState.error ? <ErrorNotice message={getErrorMessage(createState.error)} /> : null}
          <label>Story title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="A title for what comes next" maxLength={180} required /></label>
          <label>First lines<textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Every story begins somewhere..." maxLength={50_000} rows={5} required /></label>
          <button className="primary-button" type="submit" disabled={createState.isLoading}>{createState.isLoading ? 'Creating…' : 'Create story'} <ArrowRight size={15} /></button>
        </form> : null}

        <div className="story-toolbar">
          <div className="filter-pills" role="group" aria-label="Filter stories">
            <button type="button" className={!ownOnly ? 'filter-active' : ''} aria-pressed={!ownOnly} onClick={() => setOwnOnly(false)}>All stories</button>
            <button type="button" className={ownOnly ? 'filter-active' : ''} aria-pressed={ownOnly} onClick={() => setOwnOnly(true)}><SlidersHorizontal size={14} /> My circle</button>
          </div>
          <label className="story-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a story" aria-label="Search stories" /></label>
        </div>

        {isLoading ? <Loading label="Gathering stories" /> : null}
        {error ? <ErrorNotice message={getErrorMessage(error)} /> : null}
        {!isLoading && !error && visibleStories.length > 0 ? <div className="story-grid">{visibleStories.map((story, index) => <StoryCard key={story.id} story={story} index={index} />)}</div> : null}
        {!isLoading && !error && visibleStories.length === 0 ? <div className="empty-shelf"><BookPlus size={24} /><h3>{search ? 'No story by that name.' : 'The first page is still blank.'}</h3><p>{search ? 'Try a different title, author, or passage.' : 'Start a story and invite someone to write the next part.'}</p>{!search ? <button className="text-button" onClick={() => setComposerOpen(true)} type="button">Begin one here <ArrowRight size={14} /></button> : null}</div> : null}
      </section>
      <section className="closing-note"><span>“</span><p>Stories are not written. They are rewritten, together.</p><Link to="/profile">Make your mark <ArrowRight size={14} /></Link></section>
    </>
  );
}