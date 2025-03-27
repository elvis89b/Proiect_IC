--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: fridge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fridge (
    id integer NOT NULL,
    userid integer NOT NULL,
    quantity integer
);


ALTER TABLE public.fridge OWNER TO postgres;

--
-- Name: fridge_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fridge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fridge_id_seq OWNER TO postgres;

--
-- Name: fridge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fridge_id_seq OWNED BY public.fridge.id;


--
-- Name: planner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planner (
    id integer NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.planner OWNER TO postgres;

--
-- Name: planner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planner_id_seq OWNER TO postgres;

--
-- Name: planner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planner_id_seq OWNED BY public.planner.id;


--
-- Name: planner_recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planner_recipes (
    id integer NOT NULL,
    plannerid integer NOT NULL,
    recipeid integer NOT NULL,
    dayofweek text NOT NULL,
    CONSTRAINT planner_recipes_dayofweek_check CHECK ((dayofweek = ANY (ARRAY['Monday'::text, 'Tuesday'::text, 'Wednesday'::text, 'Thursday'::text, 'Friday'::text, 'Saturday'::text, 'Sunday'::text])))
);


ALTER TABLE public.planner_recipes OWNER TO postgres;

--
-- Name: planner_recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planner_recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planner_recipes_id_seq OWNER TO postgres;

--
-- Name: planner_recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planner_recipes_id_seq OWNED BY public.planner_recipes.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipes_id_seq OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: fridge id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fridge ALTER COLUMN id SET DEFAULT nextval('public.fridge_id_seq'::regclass);


--
-- Name: planner id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner ALTER COLUMN id SET DEFAULT nextval('public.planner_id_seq'::regclass);


--
-- Name: planner_recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner_recipes ALTER COLUMN id SET DEFAULT nextval('public.planner_recipes_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: fridge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fridge (id, userid, quantity) FROM stdin;
\.


--
-- Data for Name: planner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planner (id, userid) FROM stdin;
\.


--
-- Data for Name: planner_recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planner_recipes (id, plannerid, recipeid, dayofweek) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, name, description) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
\.


--
-- Name: fridge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fridge_id_seq', 1, false);


--
-- Name: planner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planner_id_seq', 1, false);


--
-- Name: planner_recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planner_recipes_id_seq', 1, false);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: fridge fridge_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fridge
    ADD CONSTRAINT fridge_pkey PRIMARY KEY (id);


--
-- Name: planner planner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner
    ADD CONSTRAINT planner_pkey PRIMARY KEY (id);


--
-- Name: planner_recipes planner_recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner_recipes
    ADD CONSTRAINT planner_recipes_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fridge fridge_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fridge
    ADD CONSTRAINT fridge_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- Name: planner_recipes planner_recipes_plannerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner_recipes
    ADD CONSTRAINT planner_recipes_plannerid_fkey FOREIGN KEY (plannerid) REFERENCES public.planner(id);


--
-- Name: planner_recipes planner_recipes_recipeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner_recipes
    ADD CONSTRAINT planner_recipes_recipeid_fkey FOREIGN KEY (recipeid) REFERENCES public.recipes(id);


--
-- Name: planner planner_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner
    ADD CONSTRAINT planner_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

