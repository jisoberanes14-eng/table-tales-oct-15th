-- The event trigger (ensure_rls) runs as the owner, so it does not need public EXECUTE.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
