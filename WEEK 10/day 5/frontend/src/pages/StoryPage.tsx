import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, Check, History, MessageCircle, Pencil, Plus, RotateCcw, Trash2, Users, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ErrorNotice, getErrorMessage, Loading } from '../components/Feedback';
import {
  useAddCommentMutation,
  useAddContributorMutation,
  useDeleteCommentMutation,
  useDeleteStoryMutation,
  useGetCommentsQuery,
  useGetContributorsQuery,
  useGetRevisionsQuery,
  useGetStoryQuery,
  useRemoveContributorMutation,
  useRestoreRevisionMutation,
  useUpdateStoryMutation,
} from '../services/storyApi';

export function StoryPage() {
  const storyId = Number(useParams().id);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetStoryQuery(storyId, { skip: !Number.isInteger(storyId) || storyId < 1 });
  const { data: commentsData } = useGetCommentsQuery(storyId, { skip: !Number.isInteger(storyId) || storyId < 1 });
  const { data: contributorsData } = useGetContributorsQuery(storyId, { skip: !Number.isInteger(storyId) || storyId < 1 });
  const { data: revisionsData } = useGetRevisionsQuery(storyId, { skip: !Number.isInteger(storyId) || storyId < 1 });
  const [updateStory, updateState] = useUpdateStoryMutation();
  const [deleteStory] = useDeleteStoryMutation();
  const [addComment, commentState] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [addContributor, contributorState] = useAddContributorMutation();
  const [removeContributor] = useRemoveContributorMutation();
  const [restoreRevision] = useRestoreRevisionMutation();
  const story = data?.story;
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isAuthor = story?.authorId === user?.id;
  const isContributor = contributorsData?.contributors.some((contributor) => contributor.userId === user?.id) ?? false;

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!story) return;
    try {
      await updateStory({ id: story.id, title, content }).unwrap();
      setEditing(false);
      setErrorMessage('');
    } catch (requestError) { setErrorMessage(getErrorMessage(requestError)); }
  }

  async function handleComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await addComment({ storyId, content: comment }).unwrap();
      setComment('');
    } catch (requestError) { setErrorMessage(getErrorMessage(requestError)); }
  }

  async function handleContributor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await addContributor({ storyId, email }).unwrap();
      setEmail('');
      setErrorMessage('');
    } catch (requestError) { setErrorMessage(getErrorMessage(requestError)); }
  }

  async function handleDeleteStory() {
    if (!story || !window.confirm('Delete this story and its comments?')) return;
    try {
      await deleteStory(story.id).unwrap();
      navigate('/');
    } catch (requestError) { setErrorMessage(getErrorMessage(requestError)); }
  }

  async function handleRestore(revisionId: number) {
    if (!window.confirm('Restore this version? The current story will be saved to history first.')) return;
    try {
      await restoreRevision({ storyId, revisionId }).unwrap();
      setErrorMessage('');
      setEditing(false);
    } catch (requestError) { setErrorMessage(getErrorMessage(requestError)); }
  }

  function beginEdit() {
    if (!story) return;
    setTitle(story.title);
    setContent(story.content);
    setEditing(true);
  }

  if (isLoading) return <Loading label="Opening story" />;
  if (error || !story) return <section className="story-missing"><ErrorNotice message={error ? getErrorMessage(error) : 'Story not found.'} /><Link className="text-button" to="/"><ArrowLeft size={15} /> Back to stories</Link></section>;

  return (
    <article className="story-view">
      <Link className="back-link" to="/"><ArrowLeft size={15} /> All stories</Link>
      <header className="story-view-header">
        <div><p className="eyebrow">A SHARED STORY · {new Date(story.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p><h1>{story.title}</h1><div className="story-view-author"><span className="avatar">{story.authorDisplayName.slice(0, 1).toUpperCase()}</span><span>Begun by <strong>{story.authorDisplayName}</strong></span><span className="meta-divider">·</span><span>Updated {new Date(story.updatedAt).toLocaleDateString()}</span></div></div>
        <div className="story-controls">{isAuthor || isContributor ? <button className="icon-button" type="button" aria-label="Edit story" title="Edit story" onClick={beginEdit}><Pencil size={16} /></button> : null}{isAuthor ? <button className="icon-button danger-icon" type="button" aria-label="Delete story" title="Delete story" onClick={handleDeleteStory}><Trash2 size={16} /></button> : null}</div>
      </header>

      {errorMessage ? <ErrorNotice message={errorMessage} /> : null}
      {editing ? <form className="story-editor" onSubmit={handleSave}><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={180} required /></label><label>Story<textarea value={content} onChange={(event) => setContent(event.target.value)} rows={12} maxLength={50_000} required /></label><div className="editor-actions"><button type="button" className="secondary-button" onClick={() => setEditing(false)}><X size={15} /> Cancel</button><button type="submit" className="primary-button" disabled={updateState.isLoading}><Check size={15} /> Save changes</button></div></form> : <div className="story-reading"><p>{story.content}</p><div className="story-endmark">✳</div></div>}

      <section className="revision-section"><button className="revision-toggle" type="button" onClick={() => setHistoryOpen(!historyOpen)} aria-expanded={historyOpen}><History size={16} /><span>Version history</span><span className="revision-count">{revisionsData?.revisions.length ?? 0}</span><span className="revision-chevron">{historyOpen ? '−' : '+'}</span></button>{historyOpen ? <div className="revision-list">{revisionsData?.revisions.length ? revisionsData.revisions.map((revision) => <article className="revision-row" key={revision.id}><div><strong>{revision.title}</strong><p>{revision.content.length > 130 ? `${revision.content.slice(0, 130)}…` : revision.content}</p><small>Saved by {revision.editorDisplayName} · {new Date(revision.createdAt).toLocaleString()}</small></div>{isAuthor || isContributor ? <button className="icon-button mini-icon" type="button" onClick={() => void handleRestore(revision.id)} aria-label={`Restore version of ${revision.title}`} title="Restore this version"><RotateCcw size={14} /></button> : null}</article>) : <p className="comments-empty">No earlier versions yet. Each edit will be saved here.</p>}</div> : null}</section>

      <section className="collaboration-section">
        <div className="collaborators-panel"><div className="subsection-heading"><Users size={16} /><h2>At the table</h2><span>{contributorsData?.contributors.length ?? 0}</span></div><div className="contributor-list"><div className="contributor-row"><span className="avatar small">{story.authorDisplayName.slice(0, 1).toUpperCase()}</span><span><strong>{story.authorDisplayName}</strong><small>Author</small></span></div>{contributorsData?.contributors.map((contributor) => <div className="contributor-row" key={contributor.id}><span className="avatar small alt-avatar">{contributor.displayName.slice(0, 1).toUpperCase()}</span><span><strong>{contributor.displayName}</strong><small>Contributor · @{contributor.username}</small></span>{isAuthor ? <button className="icon-button mini-icon" type="button" aria-label={`Remove ${contributor.displayName}`} onClick={() => void removeContributor({ id: contributor.id, storyId })}><X size={14} /></button> : null}</div>)}</div>{isAuthor ? <form className="invite-form" onSubmit={handleContributor}><label htmlFor="invite-email">Invite a collaborator</label><div><input id="invite-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Their email address" required /><button className="icon-button invite-button" type="submit" disabled={contributorState.isLoading} aria-label="Invite collaborator"><Plus size={17} /></button></div></form> : null}</div>

        <div className="comments-panel"><div className="subsection-heading"><MessageCircle size={16} /><h2>Margin notes</h2><span>{commentsData?.comments.length ?? 0}</span></div><div className="comment-list">{commentsData?.comments.length ? commentsData.comments.map((item) => <article className="comment" key={item.id}><div className="comment-head"><strong>{item.displayName}</strong><time>{new Date(item.createdAt).toLocaleDateString()}</time>{item.userId === user?.id || isAuthor ? <button className="icon-button mini-icon" type="button" aria-label="Delete comment" onClick={() => void deleteComment({ id: item.id, storyId })}><X size={13} /></button> : null}</div><p>{item.content}</p></article>) : <p className="comments-empty">No notes in the margin yet. Leave the first one.</p>}</div><form className="comment-form" onSubmit={handleComment}><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a thought or a line to continue…" rows={3} maxLength={5_000} required /><button className="primary-button" type="submit" disabled={commentState.isLoading}>Leave a note <ArrowUpRight size={15} /></button></form></div>
      </section>
    </article>
  );
}