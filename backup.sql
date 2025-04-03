--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    user_id integer,
    amount numeric(10,2) NOT NULL,
    currency character varying(3) NOT NULL,
    status character varying(20) NOT NULL,
    payment_intent_id character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_email text,
    product_id integer,
    stripe_session_id text
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    title character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    sale_price numeric(10,2),
    type character varying(50),
    video_url character varying(255),
    id integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, user_id, amount, currency, status, payment_intent_id, created_at, user_email, product_id, stripe_session_id) FROM stdin;
3	2	7450.00	USD	succeeded	pi_sample123	2025-03-15 23:47:47.737894	\N	\N	\N
6	\N	34.00	pln	pending	\N	2025-03-19 11:07:02.342917	cichy96@gmail.com	1	cs_test_a1t7By1YF9J88LTMYJhoXfuv2pEd3swKoYvYDwTHFr9Bt5RqVnQfQNUTCk
7	\N	74.50	pln	pending	\N	2025-03-19 11:25:07.069392	cichy96@gmail.com	3	cs_test_a1Ykxike4QoKzWjrby3SmW22IPovczqis6KFMX5vgU5GTiM9fiB8OhIlPa
8	\N	74.50	pln	pending	\N	2025-03-19 11:30:06.110233	cichy96@gmail.com	3	cs_test_a1UyxrLJKVvyKhGLThKJirJZ8DECz8DdL2vExusktqcZxFWrBrWUFNiIV1
9	\N	74.50	pln	pending	\N	2025-03-19 11:31:38.8432	cichy96@gmail.com	3	cs_test_a1lUKummqdUlzRL62CEMlH2NJZiouRiwDc0ktymIoz9FXzL0tAiGp7uzhh
10	\N	74.50	pln	pending	\N	2025-03-19 11:39:24.054085	cichy96@gmail.com	3	cs_test_a1WDdromV3lpTRT5b8UwnYbTL8EhUzSRx5dEbXWQ2JpWKi1OhwEgNqOULq
11	\N	74.50	pln	pending	\N	2025-03-19 11:49:22.56658	cichy96@gmail.com	3	cs_test_a18L1BWsvLANykQKZy71maAjfgxj3xARnwWwvcoekQSBXYsvW5UFK0dnPJ
12	\N	74.50	pln	pending	\N	2025-03-19 11:50:30.796592	cichy96@gmail.com	3	cs_test_a1y1IiezhahlVymZfoJjRYhWdbRdIGSNjO1BFOgd6AuDWsXNi0D5Y1K8Lw
13	\N	74.50	pln	pending	\N	2025-03-19 11:51:04.540146	cichy96@gmail.com	3	cs_test_a1GZNTJhFeDYvjpdokDmItaUO0vm86KdBbeSmk6k8xnl33f2HToqOrKnro
14	\N	74.50	pln	pending	\N	2025-03-19 11:51:29.089569	cichy96@gmail.com	3	cs_test_a1qq5ZBGxcPisV7ga4o0jizDwO8kOrBuoEs3VAQuhQESvpmXoofoI2gnhR
15	\N	74.50	pln	pending	\N	2025-03-19 13:21:46.884858	cichy96@gmail.com	3	cs_test_a11T1QYQFbQ945BvGMR3HiO73RKGKT9pkl5V5JappiSfIaxFp1QESajpzw
16	\N	74.50	pln	pending	\N	2025-03-19 13:22:48.176563	cichy96@gmail.com	3	cs_test_a1xjDgxSIJHOWTPk2QUleJQ2Vh92l8MjFeqR3ccSWNkiVaj5FHgP6GMMcN
17	\N	74.50	pln	pending	\N	2025-03-19 14:44:02.193881	cichy96@gmail.com	3	cs_test_a1roAWvT73P5N3ZvWum6ADCHHFxMMScMc9xFFdulhfpErLj3xwkigyCVtN
18	\N	74.50	pln	pending	\N	2025-03-23 19:24:30.241498	cichy96@gmail.com	3	cs_test_a1DVDUbK2dtD7tlIPiROylTlYo73a1jaPfuO4RnWn2IMGIcrA1rdUm0aJn
19	\N	74.50	pln	pending	\N	2025-03-23 19:26:45.010853	cichy96@gmail.com	3	cs_test_a1fdlEyWtRrnLBKjeRt5t4kNtBaqBLF6Eqru2MKcXuK02JkqcS81kYQcCf
20	\N	74.50	pln	pending	\N	2025-03-23 19:55:04.454578	cichy96@gmail.com	3	cs_test_a1R0OCLqTVqBloZHWLAEwp3M0DlZpqIpd6mVqY7DPwu9yvOfW3EQLvX8ev
21	\N	74.50	pln	pending	\N	2025-03-23 22:14:08.570964	cichy96@gmail.com	3	cs_test_a1GIKsh0vXASJF41C3U9y2CxFeWsX2twH87zTke4R2j1tR0eYBkK8djr8A
22	\N	74.50	pln	pending	\N	2025-03-24 20:42:41.304944	cichy96@gmail.com	3	cs_test_a1ko1rL1OtbkElqE7Em3458WuqDPtPswHSiYaiH7XsOh0j0HDetj09E6Vj
23	\N	74.50	pln	pending	\N	2025-03-24 22:03:21.743658	cichy96@gmail.com	3	cs_test_a1xVHbN3fQiW2JrrbhSUO4QQMV5zhtJwQ5aLPq6kY12zMl5me9A0tWcC47
24	\N	34.00	pln	pending	\N	2025-03-25 09:42:45.439882	cichy96@gmail.com	1	cs_test_a1Z7gg4EOzzESKBNFz8cd6ZBz4IRQgdEL2ooJRf0So83bKZdkikdwQss3P
26	\N	34.00	pln	pending	\N	2025-03-25 09:42:46.384316	cichy96@gmail.com	1	cs_test_a1Dwhezwatjhd3qIhwBfLrSQu7itRpAtN2jTy3MoOxsAQ0oKgjVNJislq2
25	\N	34.00	pln	pending	\N	2025-03-25 09:42:46.381537	cichy96@gmail.com	1	cs_test_a1nvC3Z8nYhHF23GbkD6uiDziSdvaSiC1TFO2QhSQNVLKCjZytOVtqySnI
27	\N	34.00	pln	pending	\N	2025-03-25 09:42:46.509108	cichy96@gmail.com	1	cs_test_a18d9kLYQ1ZgijwdtBmpC5n1lmF0Dpu2tjnbZjVycrNO2l5IuoRQgL2PQw
28	\N	34.00	pln	pending	\N	2025-03-25 09:42:46.554331	cichy96@gmail.com	1	cs_test_a1BAU7CWCNWFAG0sNqGd1YxgYIfyxLuC0lVSTyaVAxPC8acEqxoD6j426U
29	\N	34.00	pln	pending	\N	2025-03-25 09:42:47.370629	cichy96@gmail.com	1	cs_test_a1FndGmS9UUQ0hP4suQwe5jyHYAviwWvThpgW7TaCB2fA6GgNJMTrveYX3
30	\N	34.00	pln	pending	\N	2025-03-25 09:42:47.382485	cichy96@gmail.com	1	cs_test_a1z9ZvhGU0iCoZOlDdtgdKzOjf50LxvLN7vxtZtuzT0mkE4liPCakp6U5v
31	\N	34.00	pln	pending	\N	2025-03-25 09:42:47.443471	cichy96@gmail.com	1	cs_test_a1nGKlY8NWysdScbKYgmUsLnYSC9ydzfQq6HAwUERYx79UiCp1AsNouthU
32	\N	34.00	pln	pending	\N	2025-03-25 09:42:47.676754	cichy96@gmail.com	1	cs_test_a1Y4cUCoU0ejaO9IhxeOuV1cuvXzxGRDlMz2ACQNLUCTIG7Q8Of0iI3hgI
33	\N	34.00	pln	pending	\N	2025-03-25 09:42:47.748565	cichy96@gmail.com	1	cs_test_a19KCu9Nz3NnaZ29H4beCzpuaHfP7jmHMyVpazw3glJcoHk6YEvmZsHCWX
34	\N	34.00	pln	pending	\N	2025-03-25 09:42:48.513909	cichy96@gmail.com	1	cs_test_a1XFcXRz7jHnVudFe6RjG1KkXYCczsKfnn2EYplOH9BePKa1GYjqZTuixe
35	\N	34.00	pln	pending	\N	2025-03-25 09:42:48.517023	cichy96@gmail.com	1	cs_test_a1nlt2XxCSgeCJXPqsbmMxx1Tlb37QZ8RSqsdGMlYHCrq1fTWqp3IwlQt1
37	\N	34.00	pln	pending	\N	2025-03-25 09:42:48.520316	cichy96@gmail.com	1	cs_test_a1kRO61atNzfN7Dw6hm6T55qGSTfCCbwwO9KlHn9QP1JvwGs5KHQzIhxbp
36	\N	34.00	pln	pending	\N	2025-03-25 09:42:48.518892	cichy96@gmail.com	1	cs_test_a1LhhF0fGLkCVvDAPoa9nlLxakk3LBuj5Ol3Wss66PmDEb7VmcQZ3HuqIE
38	\N	65.00	pln	pending	\N	2025-03-25 09:45:52.912712	cichy96@gmail.com	2	cs_test_a1XWrIyGZTl9oOVv4H13rQqoRGlebxlPXNdmoOJ5h4N61olkhnnQX92WLB
39	\N	74.50	pln	pending	\N	2025-03-25 09:47:41.907555	cichy96@gmail.com	5	cs_test_a15koJK2K5rrAxSsGmCSHGUiYZBdAuYK8ZpwbOKHBfjHnwCjvdAZ2W7wBK
40	\N	65.00	pln	pending	\N	2025-03-26 11:16:26.387988	cichy96@gmail.com	10	cs_test_a1Rcjd3fESBTn5AK6B9D3t8a7A9rydmp1rONFS6Tu3fkZYbSTkNDnK4S3L
41	\N	65.00	pln	pending	\N	2025-03-26 11:16:27.106798	cichy96@gmail.com	10	cs_test_a1OVqZONhksP8BnJkJSMJBPdVWQXuRlbCFKuMsjUs6GULGhhjD3XqH88mQ
42	\N	65.00	pln	pending	\N	2025-03-26 11:16:27.151509	cichy96@gmail.com	10	cs_test_a1fyFSDwIVriHXFTf0YdfirnX0FjhYnxSxBziH4DkjwXXXwT3mVBCxd1wp
43	\N	74.50	pln	pending	\N	2025-03-26 11:26:11.12364	cichy96@gmail.com	5	cs_test_a1TtxG1ggqZOLlsKI3iMM4QxO4B2MbvGPdeXX393Evu8gGL0GEnXHaluOF
44	\N	74.50	pln	pending	\N	2025-03-28 23:49:54.722344	cichy96@gmail.com	3	cs_test_a1KW3CGWZw0L4NslJQzwMzzX5YjnDdniEsMYIcuX6GcqyyytTCvpa4CdZF
45	\N	124.50	pln	pending	\N	2025-03-31 10:01:21.462602	cichy96@gmail.com	6	cs_test_a1JrLAoWJVQtwYDlmYMycn0c1vbcvsQcgKTaKlbXIhoHsBODVdedawVUMQ
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (title, price, sale_price, type, video_url, id) FROM stdin;
Czapka First Defense	34.00	\N	apparel	\N	1
Bluza PO First Defense	65.00	\N	apparel	\N	2
Wirtualny Kurs Ukrytego Noszenia GROM	149.00	74.50	course	https://www.wyborowi.pl/videos/grom-concealed-carry.mp4	3
Wirtualny Kurs Pistoletowy GROM	149.00	74.50	course	https://www.wyborowi.pl/videos/grom-pistol.mp4	4
Wirtualny Kurs Karabinowy GROM	149.00	74.50	course	https://www.wyborowi.pl/videos/grom-rifle.mp4	5
Pakiet Wirtualny Pistolet + Karabin GROM	249.00	124.50	bundle	\N	6
Pakiet Mistrzowski Wirtualny GROM	349.00	174.50	bundle	\N	7
Koszulka z Flagą GROM Defense	32.00	\N	apparel	\N	8
Czapka GROM Defense	34.00	\N	apparel	\N	9
Bluza GROM Defense	65.00	\N	apparel	\N	10
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, created_at) FROM stdin;
2	cichy96@gmail.com	$2b$10$FpVXSHpNvjNDmKCMFVvXAeM7W4aopJqraHs89qKcquW4gZXcevBvW	2025-03-15 23:41:42.61553
\.


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 45, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


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
-- Name: payments payments_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: payments payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

