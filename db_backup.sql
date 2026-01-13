--
-- PostgreSQL database dump
--

\restrict Q9GFV8vXv9mX8LpwafQjjhnCsTkprIv0XJCsLo5uunA8PdRbs2uwYleBOLmvdqK

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

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
-- Name: categories; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent_category uuid,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO "user";

--
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO "user";

--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO "user";

--
-- Name: product_item_images; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.product_item_images (
    id uuid NOT NULL,
    img_url character varying(500) NOT NULL,
    product_item_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_thumbnail boolean DEFAULT false NOT NULL
);


ALTER TABLE public.product_item_images OWNER TO "user";

--
-- Name: product_item_variant_attributes; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.product_item_variant_attributes (
    product_item_id uuid NOT NULL,
    variant_attribute_id uuid NOT NULL
);


ALTER TABLE public.product_item_variant_attributes OWNER TO "user";

--
-- Name: product_items; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.product_items (
    id uuid NOT NULL,
    sku character varying(100) NOT NULL,
    available_stock integer,
    base_price numeric(10,2),
    discounted_price numeric(10,2),
    product_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.product_items OWNER TO "user";

--
-- Name: products; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    features text,
    category_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO "user";

--
-- Name: variant_attributes; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.variant_attributes (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    variant_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.variant_attributes OWNER TO "user";

--
-- Name: variants; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.variants (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    category_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.variants OWNER TO "user";

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.categories (id, name, parent_category, created_at, updated_at) FROM stdin;
fa0c8e4d-93e1-4fcd-93b1-45ccc3b465fb	Longest Burning Bee Wax Candles	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 15:59:41.253189	2026-01-05 15:59:41.253591
7713272c-d70e-4be5-8eeb-adb219fe2810	Luxe coconut wax candles	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 16:15:31.364385	2026-01-05 16:15:31.36442
eee5d497-7180-40b2-bdbd-eaa244ceaca3	Home Fragrance	\N	2026-01-05 09:40:32.112181	2026-01-05 09:40:32.112207
cef3cad1-70c9-4127-a3f9-e988b164a752	Candles	eee5d497-7180-40b2-bdbd-eaa244ceaca3	2026-01-05 09:40:43.820132	2026-01-05 09:40:43.820156
c447aa7a-7cba-4c64-84ea-872aa8f43027	Wax Products	eee5d497-7180-40b2-bdbd-eaa244ceaca3	2026-01-05 09:40:59.387043	2026-01-05 09:40:59.387066
ad314150-7dbb-4e47-a4aa-6f9a31fa3876	Decorative Candles	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 09:41:51.040182	2026-01-05 09:41:51.040244
addcdb4c-0fab-4ab0-af16-dcfd57bddf1f	Candle Holders	6ff88ccf-c629-4638-9642-2be3edf097a9	2026-01-05 09:42:32.896669	2026-01-05 09:42:32.896698
562ad7de-08b8-4b88-b16a-aaa8324a4e29	Wick Trimmers	6ff88ccf-c629-4638-9642-2be3edf097a9	2026-01-05 09:42:46.289064	2026-01-05 09:42:46.289092
7f548075-6809-447c-be88-4f27f65bc0ae	Burner	6ff88ccf-c629-4638-9642-2be3edf097a9	2026-01-05 10:22:19.450849	2026-01-05 10:22:19.450884
d93fc29e-2624-466c-a5c7-d0ca83751b2d	Mini Candles	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 12:24:45.778452	2026-01-05 12:24:45.778885
741c5460-bd48-46a6-a444-b824090955fa	Candle Set	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 12:28:57.585345	2026-01-05 12:28:57.585562
122acd5e-6e4c-44b4-8e00-19a416ec17ec	Jar Candles	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 09:41:26.748275	2026-01-05 13:00:05.06909
d2c1ad66-56c5-400e-b4fe-f215f75ed9a9	Piller Candles	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 13:00:22.308057	2026-01-05 13:00:29.534711
998aa8d3-6a23-428d-b01b-499beac3e3b9	Wax Melts/Bar	c447aa7a-7cba-4c64-84ea-872aa8f43027	2026-01-05 09:42:06.179643	2026-01-05 15:15:44.615689
6ff88ccf-c629-4638-9642-2be3edf097a9	Accessories	\N	2026-01-05 09:41:13.253616	2026-01-05 09:41:13.253642
\.


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
001-create-categories	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.275325	1	EXECUTED	9:0f0117edd19eaa5d4fbc4af998a026be	createTable tableName=categories; addForeignKeyConstraint baseTableName=categories, constraintName=fk_category_parent, referencedTableName=categories		\N	5.0.1	\N	\N	5692554684
002-create-variants	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.287168	2	EXECUTED	9:5cba8f9b875258d3dc47dd661de9b42a	createTable tableName=variants; addForeignKeyConstraint baseTableName=variants, constraintName=fk_variant_category, referencedTableName=categories		\N	5.0.1	\N	\N	5692554684
003-create-variant-attributes	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.299889	3	EXECUTED	9:321f1cfa5b520ba927873e1b69e827e3	createTable tableName=variant_attributes; addForeignKeyConstraint baseTableName=variant_attributes, constraintName=fk_variant_attribute_variant, referencedTableName=variants		\N	5.0.1	\N	\N	5692554684
004-create-products	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.312625	4	EXECUTED	9:32e32cd7a320fb46286f1877990d20a0	createTable tableName=products; addForeignKeyConstraint baseTableName=products, constraintName=fk_product_category, referencedTableName=categories		\N	5.0.1	\N	\N	5692554684
005-create-product-items	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.324156	5	EXECUTED	9:3ca30b2fb7ad1dd42d3d0728b3573a46	createTable tableName=product_items; addForeignKeyConstraint baseTableName=product_items, constraintName=fk_product_item_product, referencedTableName=products		\N	5.0.1	\N	\N	5692554684
006-create-product-item-images	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.332755	6	EXECUTED	9:0be818c9d669d09e22816726afa6d6b1	createTable tableName=product_item_images; addForeignKeyConstraint baseTableName=product_item_images, constraintName=fk_product_item_image_item, referencedTableName=product_items		\N	5.0.1	\N	\N	5692554684
007-create-product-item-variant-attributes	trishita	db/changelog/001-create-table.yaml	2025-12-14 11:39:15.342686	7	EXECUTED	9:9a4bdff3051e54db223cf48e922933fa	createTable tableName=product_item_variant_attributes; addPrimaryKey constraintName=pk_product_item_variant, tableName=product_item_variant_attributes; addForeignKeyConstraint baseTableName=product_item_variant_attributes, constraintName=fk_piva_p...		\N	5.0.1	\N	\N	5692554684
001-add-audit-columns-to-categories	trishita	db/changelog/002-add-audit-columns.yaml	2025-12-21 00:52:06.585897	8	EXECUTED	9:446d0c4d46d46f7a77638a6dbc5c6646	addColumn tableName=categories		\N	5.0.1	\N	\N	6258525838
002-add-audit-columns-to-products	trishita	db/changelog/002-add-audit-columns.yaml	2025-12-21 00:52:06.6106	9	EXECUTED	9:1de35e0a5568fa09c000e88202f3f02d	addColumn tableName=products		\N	5.0.1	\N	\N	6258525838
003-add-audit-columns-to-product-items	trishita	db/changelog/002-add-audit-columns.yaml	2025-12-21 00:52:06.617102	10	EXECUTED	9:a93c58d051a918610ace9c02b7ff4214	addColumn tableName=product_items		\N	5.0.1	\N	\N	6258525838
004-add-audit-columns-to-product-item-images	trishita	db/changelog/002-add-audit-columns.yaml	2025-12-21 00:52:06.621976	11	EXECUTED	9:def7b0aea9dca81f5dcdcdaca59f3609	addColumn tableName=product_item_images		\N	5.0.1	\N	\N	6258525838
005-add-audit-columns-to-variants	trishita	db/changelog/002-add-audit-columns.yaml	2025-12-21 00:52:06.627174	12	EXECUTED	9:2e4b810562ad4983a22fd37c4c284805	addColumn tableName=variants		\N	5.0.1	\N	\N	6258525838
006-add-audit-columns-to-variant-attributes	trishita	db/changelog/002-add-audit-columns.yaml	2025-12-21 00:52:06.632181	13	EXECUTED	9:4d7b1accbbd5abd9877771554052026b	addColumn tableName=variant_attributes		\N	5.0.1	\N	\N	6258525838
001-add-is_thumbnail-column-product_item_images	trishita	db/changelog/003-add-isThumbnail-column-productItemImage.yaml	2025-12-31 17:00:22.662202	14	EXECUTED	9:ce60d5e0a55289a421bb23edf5ed0ebe	addColumn tableName=product_item_images		\N	5.0.1	\N	\N	7180622518
add-unique-constraint-variant-and-attributes-name	trishita	db/changelog/004-add-unique-constraint-name-variant-attribute.yaml	2026-01-02 23:20:52.460701	15	EXECUTED	9:e08951fc0454aae02cad813c85485a0d	addUniqueConstraint constraintName=uk_variant_attributes_name, tableName=variant_attributes; addUniqueConstraint constraintName=uk_variant_name, tableName=variants		\N	5.0.1	\N	\N	7376251931
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Data for Name: product_item_images; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.product_item_images (id, img_url, product_item_id, created_at, updated_at, is_thumbnail) FROM stdin;
df78e043-e257-4206-b043-c2ac16f832e6	products/7c486b92-0344-4a92-8f7e-8557f6f8870f-gemini-generated-image-ih3rd6ih3rd6ih3r.png	ab7c79dd-e723-4558-8f13-31f365340e6e	2026-01-05 09:53:43.400714	2026-01-05 09:53:43.400716	f
d02ec5e4-58a9-45fa-8e09-6c6894e00144	products/2076e32b-8122-4ddf-83a1-12c0421a5694-gemini-generated-image-6evptk6evptk6evp.png	ab7c79dd-e723-4558-8f13-31f365340e6e	2026-01-05 09:53:43.400773	2026-01-05 09:53:43.400774	f
602e024a-f9fd-42f9-a146-89ed66d462c1	products/37459802-2e75-4b2c-943c-c05202d101d8-gemini-generated-image-kqvp00kqvp00kqvp.png	ab7c79dd-e723-4558-8f13-31f365340e6e	2026-01-05 09:53:43.400814	2026-01-05 09:53:43.400815	t
e2c96a61-481b-4a19-ad53-d630a357b512	products/f08c7774-fb3b-4cc2-8fde-f85c42ca0fe9-gemini-generated-image-qnc9yuqnc9yuqnc9.png	33d7465d-9b40-40f7-b600-83d3111d71a5	2026-01-05 09:57:15.854212	2026-01-05 09:57:15.854214	f
23363758-1242-49d2-be2e-db50f6782972	products/3b208ac8-d363-4628-8b72-b855dd8d6dab-gemini-generated-image-rtnhyhrtnhyhrtnh.png	33d7465d-9b40-40f7-b600-83d3111d71a5	2026-01-05 09:57:15.854305	2026-01-05 09:57:15.854306	t
878775d6-6a36-41da-8c7b-b388f0a8ce2a	products/942ce223-d547-4058-87f0-c2c4dc1730e5-gemini-generated-image-ih3rd6ih3rd6ih3r.png	33d7465d-9b40-40f7-b600-83d3111d71a5	2026-01-05 09:57:15.854347	2026-01-05 09:57:15.854348	f
0de04cbe-ad74-4221-b061-a948ff3f9351	products/5299bac7-a3cd-410a-b19f-cdc889fa3856-gemini-generated-image-f5p5vef5p5vef5p5.png	f2aa60ed-f4b5-4cdb-86cb-c4a4c4e72bbf	2026-01-05 10:00:35.322468	2026-01-05 10:00:35.322468	f
7b6077f6-8538-43a4-9790-de05e779a2d2	products/b3372426-6d71-4d66-9dbc-35bc505dfe8c-gemini-generated-image-o4tsizo4tsizo4ts.png	f2aa60ed-f4b5-4cdb-86cb-c4a4c4e72bbf	2026-01-05 10:00:35.322498	2026-01-05 10:00:35.322499	t
960ae740-5d19-4013-a44b-7e7ac1257844	products/786e7962-d3f7-45ed-bc87-d55dee4bf332-gemini-generated-image-x7ys22x7ys22x7ys.png	ae68932f-cafa-4b87-9172-9f31e29435e4	2026-01-05 10:06:57.483058	2026-01-05 10:06:57.48306	f
980aac76-068f-43a7-82bf-c30fa985bddb	products/ffe08738-85a1-4b20-bc40-8a64195d35c0-gemini-generated-image-tc691ltc691ltc69.png	ae68932f-cafa-4b87-9172-9f31e29435e4	2026-01-05 10:06:57.483119	2026-01-05 10:06:57.48312	f
6ebeeea4-d02d-47da-88bc-b61ba3b9b395	products/c432235c-f9cf-426f-85bf-e48b0ea28a14-gemini-generated-image-iodk7miodk7miodk.png	ae68932f-cafa-4b87-9172-9f31e29435e4	2026-01-05 10:06:57.483163	2026-01-05 10:06:57.483164	t
6597ab4d-d1e9-4a81-9d53-99a17447743c	products/dd5569d4-7f08-4b5d-a911-7143f0503517-gemini-generated-image-14u36g14u36g14u3.png	601f2670-aca3-4392-b57b-8ad1a1606463	2026-01-05 10:10:12.025061	2026-01-05 10:10:12.025061	f
ed3c17a7-1e13-43fe-a24f-9dd5a7dae134	products/0d62caf1-b471-468f-9feb-00fcd70df29b-gemini-generated-image-9ueenz9ueenz9uee.png	601f2670-aca3-4392-b57b-8ad1a1606463	2026-01-05 10:10:12.025097	2026-01-05 10:10:12.025098	t
48b39fdc-3671-42f1-8869-db0980bf38c5	products/3cea59ba-8de6-4354-9a4b-d74f6066f033-gemini-generated-image-56obhm56obhm56ob.png	a87dac27-53ff-4dde-9e52-708b76abc395	2026-01-05 10:14:11.660068	2026-01-05 10:14:11.660069	f
d67db86e-a7fd-428d-910f-762a62f489b9	products/45964e41-adec-4fe7-8851-c5be909d8871-gemini-generated-image-y7cd1y7cd1y7cd1y.png	a87dac27-53ff-4dde-9e52-708b76abc395	2026-01-05 10:14:11.660149	2026-01-05 10:14:11.66015	t
a59e1878-8ccf-49a5-aef1-a4a7f6ea550f	products/2f094dee-155b-4b9a-b057-23f761eb3395-gemini-generated-image-hz42nthz42nthz42.png	3900c33c-7bb1-41d8-b295-7c3765f70827	2026-01-05 10:16:18.155727	2026-01-05 10:16:18.155728	f
96d1d214-2c95-4b9d-bfc4-6f2a8722e915	products/21205475-e972-4b62-955e-04791628a4fe-gemini-generated-image-d563rtd563rtd563.png	3900c33c-7bb1-41d8-b295-7c3765f70827	2026-01-05 10:16:18.155767	2026-01-05 10:16:18.155767	t
04b42971-c11c-4a2f-9908-9989f63be39c	products/0d5c936d-3860-405d-b3b5-ec877adcc2f8-gemini-generated-image-tb9q0vtb9q0vtb9q.png	531c358d-21cc-40c8-b774-a0a3984ef4a3	2026-01-05 11:29:22.243482	2026-01-05 11:29:22.243483	t
df0dd38d-56e4-4668-ac3a-a7d1df47b9f0	products/986fdda0-1709-43dc-99b3-af2161b2e70b-gemini-generated-image-lffyjilffyjilffy.png	531c358d-21cc-40c8-b774-a0a3984ef4a3	2026-01-05 11:29:22.243539	2026-01-05 11:29:22.243539	f
ada554a7-7de7-458f-99f7-59f184917a55	products/0053fa16-79be-4746-81a5-f10f3283e26a-gemini-generated-image-30yghj30yghj30yg.png	03212376-e58a-4c34-bab3-999481f1f420	2026-01-05 13:17:21.732145	2026-01-05 13:17:21.732154	f
85fdbb9b-ce09-40f3-8ba4-792c2adf22ee	products/ca199157-ee22-4743-8c6e-3341bdcdc13f-gemini-generated-image-3cb9pa3cb9pa3cb9.png	03212376-e58a-4c34-bab3-999481f1f420	2026-01-05 13:17:21.732236	2026-01-05 13:17:21.732236	t
daf9814b-5b26-4024-af4f-0195dfa227b4	products/8fd8dea0-b10c-4e18-b6f6-ae308fe4b878-gemini-generated-image-esw2hoesw2hoesw2.png	03212376-e58a-4c34-bab3-999481f1f420	2026-01-05 13:17:21.732276	2026-01-05 13:17:21.732276	f
0cc91d29-8a4b-403b-a171-8e379f7a16f6	products/048767de-07a2-494d-8a17-272027e0cc40-gemini-generated-image-30yghj30yghj30yg.png	f903617e-d442-49e2-a036-f4e9b9205557	2026-01-05 13:18:21.502736	2026-01-05 13:18:21.502736	f
6359f29a-0740-40d7-b8e3-816eb2d67912	products/d6deecfb-3d15-42ca-bd9e-b67d84a8cd2b-gemini-generated-image-3cb9pa3cb9pa3cb9.png	f903617e-d442-49e2-a036-f4e9b9205557	2026-01-05 13:18:21.502792	2026-01-05 13:18:21.502793	t
701dd09b-4270-4005-915c-cd78690621fb	products/7b550603-cccb-44ff-ab7e-8b6a1a0b1171-gemini-generated-image-esw2hoesw2hoesw2.png	f903617e-d442-49e2-a036-f4e9b9205557	2026-01-05 13:18:21.502817	2026-01-05 13:18:21.502818	f
86213fac-9a79-4285-a70e-5e56ad24a6c4	products/302400c5-b5db-4cd2-bb9a-396fcd4a22ff-gemini-generated-image-3cb9pa3cb9pa3cb9.png	11b1a9ca-8774-468a-b1ba-52dd4ebaab36	2026-01-05 13:19:22.528534	2026-01-05 13:19:22.528536	t
5c559560-70f1-4645-af32-63d0bcd4285e	products/6b47711b-4e0b-44f3-85ef-5119048bdc12-gemini-generated-image-30yghj30yghj30yg.png	11b1a9ca-8774-468a-b1ba-52dd4ebaab36	2026-01-05 13:19:22.5286	2026-01-05 13:19:22.528601	f
ff5f011d-21d4-4515-8eed-d6428a34c274	products/c5fb5926-cb16-4aa4-acee-c87bb74e3df6-gemini-generated-image-esw2hoesw2hoesw2.png	11b1a9ca-8774-468a-b1ba-52dd4ebaab36	2026-01-05 13:19:22.528673	2026-01-05 13:19:22.528676	f
71271189-dba2-403a-9f15-88e743e98459	products/73d65fd8-1b2e-4606-a752-dcc5fea10b95-gemini-generated-image-3cb9pa3cb9pa3cb9.png	21d908ac-1cad-42f4-936d-a2c7e4feb432	2026-01-05 13:20:10.733997	2026-01-05 13:20:10.733997	t
ce0e495f-123d-467d-bb70-38f65accfe35	products/b5e5bc10-6ddf-410e-a936-fbdf259a1499-gemini-generated-image-30yghj30yghj30yg.png	21d908ac-1cad-42f4-936d-a2c7e4feb432	2026-01-05 13:20:10.734029	2026-01-05 13:20:10.734029	f
e5ff1e17-e09c-44bc-91a2-1654bf091ceb	products/d60d656b-5f34-4380-8304-de5fdc0b3245-gemini-generated-image-esw2hoesw2hoesw2.png	21d908ac-1cad-42f4-936d-a2c7e4feb432	2026-01-05 13:20:10.734048	2026-01-05 13:20:10.734049	f
ef98d5bc-faf9-45a5-8ea2-1cc039b82b52	products/07327a03-222f-47c9-8a20-9acc415f1959-gemini-generated-image-b8en62b8en62b8en.png	e935ac03-4612-4c21-b07d-c0b938a08c3a	2026-01-05 13:36:07.567906	2026-01-05 13:36:07.567907	f
1e6c1ca6-ff22-47ea-b9fb-a2a194cc4a3a	products/c13ba803-e3bf-4f0d-a6cd-88ad80bd2ad3-gemini-generated-image-dmhouzdmhouzdmho-1-.png	e935ac03-4612-4c21-b07d-c0b938a08c3a	2026-01-05 13:36:07.568117	2026-01-05 13:36:07.568118	t
b661d864-7a5a-43d6-bd78-f931314212ad	products/d56f6c74-0503-4fcc-9a0c-8ef3edf502e9-gemini-generated-image-dmhouzdmhouzdmho.png	821371e1-9ceb-4847-a4ab-f889b18788b2	2026-01-05 13:37:03.037265	2026-01-05 13:37:03.037266	t
6a3f7a6d-1191-44a1-ad1f-309d396878ae	products/7a0a1337-6b89-4bbd-99d1-719940da48bd-gemini-generated-image-b8en62b8en62b8en.png	821371e1-9ceb-4847-a4ab-f889b18788b2	2026-01-05 13:37:03.037292	2026-01-05 13:37:03.037293	f
087e99fa-18cc-4945-a0a6-afa835e54f5f	products/b8b51d3b-1648-419e-b1bd-02b4e5b7c09b-gemini-generated-image-jtnd0jtnd0jtnd0j.png	710f8fe9-4bac-433a-af7d-2f3e760958be	2026-01-05 13:42:19.803131	2026-01-05 13:42:19.803131	t
46408e83-5867-4118-8341-731522e10e81	products/f699306f-3bc5-431a-bfd1-0cd67cae8e9a-gemini-generated-image-4mikl44mikl44mik.png	710f8fe9-4bac-433a-af7d-2f3e760958be	2026-01-05 13:42:19.803165	2026-01-05 13:42:19.803165	f
9e1309a8-cc83-4dd8-984d-bf5e1a9dbe90	products/6eb4208e-3e6c-4da1-a67c-0e428f1e1f22-gemini-generated-image-gsruqngsruqngsru.png	710f8fe9-4bac-433a-af7d-2f3e760958be	2026-01-05 13:42:19.803183	2026-01-05 13:42:19.803183	f
790bdcfd-f6cb-4e94-8703-e28ce36613fb	products/250847bd-a360-43cd-b301-7c230bec356b-gemini-generated-image-4mikl44mikl44mik-1-.png	7ed05383-844f-4550-9297-a96396719214	2026-01-05 13:43:17.497668	2026-01-05 13:43:17.497668	t
d99d6046-3179-4727-935e-661ea1213014	products/f4a64c3f-bf66-45cc-a673-bb57450cc4f7-gemini-generated-image-gsruqngsruqngsru.png	7ed05383-844f-4550-9297-a96396719214	2026-01-05 13:43:17.497713	2026-01-05 13:43:17.497714	f
7c459a51-b0e5-4294-892d-c736c3233e22	products/75777f61-4368-4223-85f7-92ab1ac3d3b5-gemini-generated-image-uqhrzouqhrzouqhr.png	2f5d34f8-f103-433e-adc7-afab24ff352f	2026-01-05 13:48:06.971628	2026-01-05 13:48:06.971629	f
a500da93-82c3-414d-b13d-78efc7805322	products/7e87b291-459c-4a95-809c-a731b85916d4-gemini-generated-image-bfufn5bfufn5bfuf.png	2f5d34f8-f103-433e-adc7-afab24ff352f	2026-01-05 13:48:06.971653	2026-01-05 13:48:06.971654	t
637c02e6-df4f-47c5-9ad4-01e0cf34f583	products/748bd77f-da31-4eb0-8672-a74912d66e3b-gemini-generated-image-bfufn5bfufn5bfuf.png	bd0f5a8d-0f82-4e53-8c21-b8fd128b38f5	2026-01-05 13:50:07.778827	2026-01-05 13:50:07.778828	t
fcab35ba-9415-4994-9c8f-cdb39a132ed8	products/6751867b-5382-41ca-a299-190834e5e80e-gemini-generated-image-uqhrzouqhrzouqhr.png	bd0f5a8d-0f82-4e53-8c21-b8fd128b38f5	2026-01-05 13:50:07.778941	2026-01-05 13:50:07.778941	f
ef2b2f40-4318-492e-9511-101349a22112	products/6c411de2-583a-467a-9d76-6f51ba9b9b59-gemini-generated-image-uqhrzouqhrzouqhr.png	975a6992-92ea-4c45-acfa-f39aab3f4f26	2026-01-05 13:52:07.016258	2026-01-05 13:52:07.016259	f
c7bf5ae3-3d88-4a29-87cb-e185f14271d3	products/dba07127-67c4-41fd-b808-1bf286ef0b1a-gemini-generated-image-bfufn5bfufn5bfuf.png	975a6992-92ea-4c45-acfa-f39aab3f4f26	2026-01-05 13:52:07.016287	2026-01-05 13:52:07.016287	t
9e414d3d-7f8c-4526-ae38-36240cdfdc5d	products/36bc68f9-b82b-4bf0-95d3-a456cf0d8885-gemini-generated-image-yqyvsdyqyvsdyqyv.png	8a751905-21c8-4f39-bccc-e20fe089a2da	2026-01-05 13:54:59.481198	2026-01-05 13:54:59.481198	t
a8cfa98b-9d35-4812-918f-7bee024f4287	products/94902c3c-dbc9-4aae-ad0c-20428f15f312-gemini-generated-image-4wvibs4wvibs4wvi.png	8a751905-21c8-4f39-bccc-e20fe089a2da	2026-01-05 13:54:59.481248	2026-01-05 13:54:59.481248	f
c6d6d090-64ae-48d6-9448-83974ca25259	products/91fe3713-259e-4540-b3a1-df15d03156b1-gemini-generated-image-yqyvsdyqyvsdyqyv.png	26f7bcc3-883c-4df8-98aa-9298d510a32a	2026-01-05 13:55:45.434723	2026-01-05 13:55:45.434724	t
88925169-4e80-49b8-b1e7-62fec86c2636	products/f4e137d5-ea39-45db-af7a-785bfa83c402-gemini-generated-image-4wvibs4wvibs4wvi.png	26f7bcc3-883c-4df8-98aa-9298d510a32a	2026-01-05 13:55:45.434773	2026-01-05 13:55:45.434774	f
7956c3ef-e927-4fdb-95cc-bb48f6eccfab	products/1b8d1d30-6141-45c4-a93d-817518639909-gemini-generated-image-yqyvsdyqyvsdyqyv.png	7ca46aba-57d6-47fb-a2a7-c58101815173	2026-01-05 13:57:48.34135	2026-01-05 13:57:48.34135	t
f7e630a5-004a-4281-aefa-6015b8ed8f3f	products/f0e8bac6-4db8-4c72-9005-2f29bddebb32-gemini-generated-image-4wvibs4wvibs4wvi.png	7ca46aba-57d6-47fb-a2a7-c58101815173	2026-01-05 13:57:48.341416	2026-01-05 13:57:48.341416	f
55830420-0fc5-476a-8f30-755989baf6bf	products/73af2e1c-7af7-401f-a742-6782fa9c848d-gemini-generated-image-qu20h1qu20h1qu20.png	7297b7c1-5daf-4bb4-97ae-9ab60f40c279	2026-01-05 14:02:53.153151	2026-01-05 14:02:53.153151	t
042ecbb9-736a-493b-a958-0c751732fb0d	products/0a74c261-d524-4eb1-88d4-c361b72e2513-gemini-generated-image-upomxsupomxsupom.png	7297b7c1-5daf-4bb4-97ae-9ab60f40c279	2026-01-05 14:02:53.153776	2026-01-05 14:02:53.153776	f
8208f730-4451-490e-9a77-0c0f7a6b77d1	products/3305f104-5e07-42cd-abc8-b627941300a5-gemini-generated-image-w1ng1ow1ng1ow1ng.png	d7431371-e46a-4f03-975c-f60b5ee9208b	2026-01-05 14:05:30.195033	2026-01-05 14:05:30.195034	f
41cd2baf-503e-4779-84dc-cb8edd19c043	products/ab3e765f-feee-4b6d-8688-4804295222ea-gemini-generated-image-2set3c2set3c2set.png	d7431371-e46a-4f03-975c-f60b5ee9208b	2026-01-05 14:05:30.195112	2026-01-05 14:05:30.195112	t
9b056228-7635-47e9-bcb6-ea5ab5c24672	products/ce1a1c5e-55f7-4aa7-96da-19de70fcb078-gemini-generated-image-v8octtv8octtv8oc.png	22ead325-bd6b-4bd0-8db4-f509271ae311	2026-01-05 14:10:57.355429	2026-01-05 14:10:57.35543	f
573ee00f-1d02-48b2-9072-9249a3cd661d	products/41c0bc15-f479-4e76-9ba8-3dd015abe816-gemini-generated-image-khjyzkhjyzkhjyzk.png	22ead325-bd6b-4bd0-8db4-f509271ae311	2026-01-05 14:10:57.355535	2026-01-05 14:10:57.355535	t
d37eebf0-4eac-4a84-9eac-37bf97944dab	products/f72e4294-04fd-4fe3-b6fb-3a14cb492fd7-gemini-generated-image-ombgllombgllombg-1-.png	c991924e-66db-41a8-ac75-b56ade3a1a2c	2026-01-05 14:16:12.384503	2026-01-05 14:16:12.384503	t
494849ab-d3c7-4205-a999-bb488e23430a	products/7d0acbda-83f7-4a78-8dc0-0c8b3eed2dd8-gemini-generated-image-jg36xpjg36xpjg36.png	c991924e-66db-41a8-ac75-b56ade3a1a2c	2026-01-05 14:16:12.38457	2026-01-05 14:16:12.38457	f
801a5df7-7b9d-4bf3-b628-c367897bcf64	products/cbe107e1-65e4-428a-8ac7-f43cc264c070-gemini-generated-image-ombgllombgllombg-1-.png	fc6a0386-84b2-4844-809f-499b0e360991	2026-01-05 14:16:47.741015	2026-01-05 14:16:47.741015	t
1f5a3ae8-a58d-4ade-ba17-c3ea13c5e295	products/be46a3b6-c4a5-401c-b9c6-c25ad75819c8-gemini-generated-image-jg36xpjg36xpjg36.png	fc6a0386-84b2-4844-809f-499b0e360991	2026-01-05 14:16:47.741051	2026-01-05 14:16:47.741051	f
d9c9dc88-8808-423b-b093-57a109d2a7f1	products/1e8b8d65-1410-48bd-84a4-d6e173f36b2c-gemini-generated-image-9gjzbb9gjzbb9gjz.png	b0e785bb-6750-4e18-ba27-cd7d487f7c62	2026-01-05 14:28:55.231299	2026-01-05 14:28:55.231301	t
91dfd094-8b2d-4194-be66-34748b4cb432	products/2c149620-3b9b-4c02-b8b6-f14ca05c0bd2-gemini-generated-image-hoacu6hoacu6hoac.png	b0e785bb-6750-4e18-ba27-cd7d487f7c62	2026-01-05 14:28:55.231621	2026-01-05 14:28:55.231621	f
32d6426c-dd8e-404d-8d19-cfa75f94683b	products/31096fd0-7f12-4c63-9729-ae59d5ec6c39-gemini-generated-image-hoacu6hoacu6hoac.png	734480a9-c612-4b70-961c-636c83447fed	2026-01-05 14:29:26.245299	2026-01-05 14:29:26.2453	f
4add807b-a793-4186-bb82-c13a8154587c	products/f109af35-41a2-4b35-9574-859c2cb8d559-gemini-generated-image-9gjzbb9gjzbb9gjz.png	734480a9-c612-4b70-961c-636c83447fed	2026-01-05 14:29:26.24536	2026-01-05 14:29:26.24536	t
9c60e54b-c1e2-4c72-a843-d68d30221a43	products/bf2ff9fd-993c-4f55-a970-d1b7be06e38c-gemini-generated-image-hoacu6hoacu6hoac.png	fbd789db-00bb-4926-a58d-9be527655cbd	2026-01-05 14:30:02.438936	2026-01-05 14:30:02.438937	f
bf1acdb5-521d-4206-b8f6-eacb40565db1	products/ffbf54c8-66a2-4e6e-8cae-857372ddec43-gemini-generated-image-9gjzbb9gjzbb9gjz.png	fbd789db-00bb-4926-a58d-9be527655cbd	2026-01-05 14:30:02.438976	2026-01-05 14:30:02.438977	t
accb46d0-80ec-4cc9-aec9-580be9a4189a	products/f4f02c97-92f6-4b98-b0ae-026f49f204fa-gemini-generated-image-77a0ed77a0ed77a0.png	dc24f8a5-0034-46c9-814a-c754a963ea96	2026-01-05 14:37:45.941398	2026-01-05 14:37:45.9414	t
450f071a-e953-421f-a803-89c752cedfc6	products/19a9f0e4-737c-4c8a-ad65-01ee6717815a-gemini-generated-image-4uqzdh4uqzdh4uqz.png	dc24f8a5-0034-46c9-814a-c754a963ea96	2026-01-05 14:37:45.941443	2026-01-05 14:37:45.941444	f
77121f60-5d5e-40dc-8da6-63e65e6a8ebb	products/a23405fc-7a6c-4918-96e7-20847e8cbd9f-candle-care-website.webp	dc24f8a5-0034-46c9-814a-c754a963ea96	2026-01-05 14:40:41.508826	2026-01-05 14:40:41.508837	f
a0b51e29-1a0c-4183-8366-ef74a8b03e16	products/32ff162d-42f0-4848-9bbf-98399c2220a1-ayra-icons-website.webp	dc24f8a5-0034-46c9-814a-c754a963ea96	2026-01-05 14:40:41.509029	2026-01-05 14:40:41.50903	f
1fc12294-962b-4388-9d8d-cccdeb626068	products/b2d6a984-8624-468d-ba73-b6737343343b-ayra-icons-website.webp	62784a33-88c8-462c-a39a-0b6f94b6c25f	2026-01-05 14:41:54.263993	2026-01-05 14:41:54.264	f
f92449f7-de9c-4ec2-acc6-90208599dc1f	products/46273218-dfe3-4156-a251-653413fcef87-gemini-generated-image-4uqzdh4uqzdh4uqz.png	62784a33-88c8-462c-a39a-0b6f94b6c25f	2026-01-05 14:41:54.264143	2026-01-05 14:41:54.264146	f
45cbfa25-2e05-4a86-8cb3-b7ddd30fcc89	products/89739d3d-6869-46ca-9d2b-5a7238326c2c-candle-care-website.webp	62784a33-88c8-462c-a39a-0b6f94b6c25f	2026-01-05 14:41:54.264194	2026-01-05 14:41:54.264196	f
2b030ebb-5c0e-44c9-88fe-0062d67e1399	products/0f1ddcd4-9b73-46a6-9ed1-fb615f39f0e3-gemini-generated-image-77a0ed77a0ed77a0.png	62784a33-88c8-462c-a39a-0b6f94b6c25f	2026-01-05 14:41:54.264276	2026-01-05 14:41:54.264278	t
5ace60cb-f107-404b-bd00-bd6680aba061	products/2599e975-a4f4-441e-9aa0-a9ace13f4d3d-gemini-generated-image-jiz1czjiz1czjiz1.png	323a581b-3793-4b37-ac85-5541b63f0cd8	2026-01-05 14:50:02.022504	2026-01-05 14:50:02.022514	f
2c3282da-b66d-4cd2-9ebc-0011144895be	products/69696317-c421-4c19-a28b-3071ea1dc8d2-candle-care-website.webp	323a581b-3793-4b37-ac85-5541b63f0cd8	2026-01-05 14:50:02.022802	2026-01-05 14:50:02.023008	f
df829e5d-0975-4bd8-8b56-9eaad20414b9	products/2ae22d2c-36d5-47c1-927c-4807cd1d0cbe-ayra-icons-website.webp	323a581b-3793-4b37-ac85-5541b63f0cd8	2026-01-05 14:50:02.023046	2026-01-05 14:50:02.023067	f
c5a1cd2e-4d5b-4c48-ab80-5b4ae9e8b532	products/d205885b-2444-43e7-ba76-c1a2029b28c4-gemini-generated-image-wq5fyswq5fyswq5f.png	323a581b-3793-4b37-ac85-5541b63f0cd8	2026-01-05 14:50:02.023123	2026-01-05 14:50:02.023124	t
d173f4ce-d69a-4119-8640-ef0a4718a13a	products/e4763edd-7715-4a2f-a94d-802f45eab7b1-gemini-generated-image-bsegrabsegrabseg.png	3cd7abac-a19a-4498-8421-a23f0c27ebcd	2026-01-05 14:54:03.532435	2026-01-05 14:54:03.532436	f
ba8b1f10-903a-488e-9513-88b03505c0e7	products/ba176be7-0937-472c-81cb-caae957011cf-ayra-icons-website.webp	3cd7abac-a19a-4498-8421-a23f0c27ebcd	2026-01-05 14:54:03.532547	2026-01-05 14:54:03.532548	f
701f893d-ce2d-4e16-b30f-b04695b95280	products/fa127e37-6cf6-4c9a-92b8-46f5ae6d2ac5-candle-care-website.webp	3cd7abac-a19a-4498-8421-a23f0c27ebcd	2026-01-05 14:54:03.532584	2026-01-05 14:54:03.532588	f
e96395d3-6185-4a30-b2a9-04bfbe4ce658	products/2e128a37-43d4-4e1d-a0f2-a8c037e48aa5-gemini-generated-image-q0q91wq0q91wq0q9.png	3cd7abac-a19a-4498-8421-a23f0c27ebcd	2026-01-05 14:54:03.532633	2026-01-05 14:54:03.532634	t
2471f195-5796-4926-ad1f-b8579bd69844	products/d9cc2130-8612-4ebb-9ca6-df870d291c79-gemini-generated-image-kvq5rskvq5rskvq5.png	8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	2026-01-05 14:56:22.629431	2026-01-05 14:56:22.629432	t
9bfd2388-6124-4d9e-bfd2-36e87ad09ca5	products/2342a2b4-2767-4735-bd9d-90997accc4f9-gemini-generated-image-wxnyr8wxnyr8wxny.png	8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	2026-01-05 14:56:22.629462	2026-01-05 14:56:22.629462	f
3850eb81-d890-46b9-9d2c-50a84ccb8c1d	products/9f9f37c4-43b6-4642-8707-39e9adbf7791-candle-care-website.webp	8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	2026-01-05 14:56:22.629478	2026-01-05 14:56:22.629479	f
d131fc7e-699a-49ac-84e7-5277a5f5a73c	products/f2b8fd9e-c1b0-4809-ab14-8730aa88b8af-ayra-icons-website.webp	8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	2026-01-05 14:56:22.629492	2026-01-05 14:56:22.629493	f
95e9f802-70b2-45b5-b3c3-7a1ab8250c56	products/8406ef95-c778-4068-b932-fdfb8206ecb4-gemini-generated-image-yujesfyujesfyuje.png	13065e53-f6b2-4cd7-b9eb-5e62f223d825	2026-01-05 15:00:02.588762	2026-01-05 15:00:02.588772	f
f3f0a520-569b-4ba4-aac3-2e83acc9f32b	products/fb85a9e7-3dcc-401c-bd98-b125817eb0b3-candle-care-website.webp	13065e53-f6b2-4cd7-b9eb-5e62f223d825	2026-01-05 15:00:02.588844	2026-01-05 15:00:02.588845	f
724385fb-9e6a-44e5-a51d-110f3044ca3e	products/8fd67faa-85e3-4a2a-9bee-e3a74b09f91d-ayra-icons-website.webp	13065e53-f6b2-4cd7-b9eb-5e62f223d825	2026-01-05 15:00:02.588874	2026-01-05 15:00:02.588875	f
829754e2-ce20-4bc6-9759-2b9bdb6dd49a	products/fec26eaa-3b9b-4647-9e78-f4500953075f-ayra-icons-website.webp	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.944007	2026-01-05 15:50:26.944007	f
c4c9ccaa-2282-4d1e-99b6-af7b44864581	products/938b648d-e78c-46ad-a9e9-58f8ee8825ea-gemini-generated-image-h94pc5h94pc5h94p.png	13065e53-f6b2-4cd7-b9eb-5e62f223d825	2026-01-05 15:00:02.588926	2026-01-05 15:00:02.588926	f
0a05f17a-e08d-433d-96c1-9c0faa872936	products/bd253ed7-92c2-4b74-b039-3f49361b4508-gemini-generated-image-cm8qwbcm8qwbcm8q.png	13065e53-f6b2-4cd7-b9eb-5e62f223d825	2026-01-05 15:00:02.588951	2026-01-05 15:00:02.588952	t
a623bc2d-36f0-4283-ac92-b3abb77746cd	products/ee69d0ed-2414-4f7d-9c80-42169e213771-gemini-generated-image-m8havwm8havwm8ha.png	2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	2026-01-05 15:03:40.742587	2026-01-05 15:03:40.742594	f
62508f57-e20d-407c-a52d-8e401df73913	products/4bdeba7b-f509-40ac-92f4-2e9496ac69bd-candle-care-website.webp	2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	2026-01-05 15:03:40.742859	2026-01-05 15:03:40.74286	f
6662fc24-1cba-463b-9da7-92910c51f661	products/2f3c69ce-577d-4858-a891-2c77b6556042-gemini-generated-image-60ar2i60ar2i60ar.png	2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	2026-01-05 15:03:40.742882	2026-01-05 15:03:40.742883	f
8c3ea1e6-14cf-4666-87c7-9b3e4e1c96c4	products/fa4da066-998b-4c69-9ca7-4d04f3684da4-gemini-generated-image-3poydg3poydg3poy.png	2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	2026-01-05 15:03:40.742909	2026-01-05 15:03:40.742909	t
be32cff9-8b78-4d2f-aa17-e9b41e601e39	products/92da337b-a948-4b18-8147-4244ed5e65f8-ayra-icons-website.webp	2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	2026-01-05 15:03:40.742921	2026-01-05 15:03:40.742928	f
6ea4b38e-2be9-4c52-a1a6-8b9015481a64	products/778aefe7-234e-47a7-9b1b-42ffb922c7b3-ayra-icons-website.webp	6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	2026-01-05 15:07:25.796834	2026-01-05 15:07:25.796857	f
1112a2a5-35a2-4027-a67c-3f50d375e170	products/4a9365ee-5a02-42cf-a19b-ab30a9ad4ede-premium-photo-1666632470596-d5d237620996.webp	6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	2026-01-05 15:07:25.796951	2026-01-05 15:07:25.796951	f
253f5481-ef23-4ade-97f7-fdb83fd2c79b	products/b4541e06-83f6-41bd-a599-16e457287659-candle-care-website.webp	6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	2026-01-05 15:07:25.796985	2026-01-05 15:07:25.79699	f
d7306872-ed0a-4eca-b8e0-3d96d575e6aa	products/c384d3e4-e37c-4995-950c-5b31b11b9402-photo-1676129125365-8a9eda7d2fb0.webp	6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	2026-01-05 15:07:25.797032	2026-01-05 15:07:25.797033	t
b10614dd-4a88-4329-a599-4272ea23a92f	products/7acd6b22-fa29-4551-b985-575714779857-candle-care-website.webp	98c4fe67-b0d7-45ea-a4b4-bf43e765021c	2026-01-05 15:08:36.931617	2026-01-05 15:08:36.931618	f
ccf16c5f-1c3d-4a93-998e-8b54e2e02bfd	products/5703d2e6-7a98-4b97-850c-0e4112a83572-ayra-icons-website.webp	98c4fe67-b0d7-45ea-a4b4-bf43e765021c	2026-01-05 15:08:36.931679	2026-01-05 15:08:36.931679	f
b964f6ac-6971-4b8f-a27d-53274e57bdc7	products/f4a0510b-4756-44d4-9ecc-f7e6950f6ffe-photo-1676129125365-8a9eda7d2fb0.webp	98c4fe67-b0d7-45ea-a4b4-bf43e765021c	2026-01-05 15:08:36.931698	2026-01-05 15:08:36.931699	t
bff55289-cf20-4545-9dc5-2004735fc121	products/e81e7ed8-1e7a-4de9-8f80-7e433ac5ea79-premium-photo-1666632470596-d5d237620996.webp	98c4fe67-b0d7-45ea-a4b4-bf43e765021c	2026-01-05 15:08:36.931723	2026-01-05 15:08:36.931724	f
9cd4ee45-55ad-4a4f-b398-dd9a25777550	products/4bddbeb8-6b24-42fd-9408-2433b8a2a76c-ayra-icons-website.webp	74228e37-16c6-4dc5-a342-66f766a861fc	2026-01-05 15:09:09.623225	2026-01-05 15:09:09.623226	f
2f141a5e-1611-48d9-9068-9760e9d5397c	products/3aee9713-b22f-4eb0-aa69-f98bd137b461-premium-photo-1666632470596-d5d237620996.webp	74228e37-16c6-4dc5-a342-66f766a861fc	2026-01-05 15:09:09.623344	2026-01-05 15:09:09.623345	f
8b0f6f5e-9fe0-4d93-82e6-2148f49a6b4c	products/fa20c68f-5b17-417c-a901-e3d313b9d6ee-candle-care-website.webp	74228e37-16c6-4dc5-a342-66f766a861fc	2026-01-05 15:09:09.62339	2026-01-05 15:09:09.623391	f
52a9c011-6716-4d59-9f46-ebfbc23c7cf6	products/ace08b5d-c086-4d15-96ed-e44589b023dc-photo-1676129125365-8a9eda7d2fb0.webp	74228e37-16c6-4dc5-a342-66f766a861fc	2026-01-05 15:09:09.623436	2026-01-05 15:09:09.623436	f
ad44c532-9350-4800-b3f2-ec4a9b987829	products/95a36bfb-bedb-4388-9124-db9f675e94c1-photo-1676129125365-8a9eda7d2fb0.webp	74228e37-16c6-4dc5-a342-66f766a861fc	2026-01-05 15:09:09.623468	2026-01-05 15:09:09.623468	t
bb408204-c40e-4ff4-b934-9f06745dbcae	products/f5366ab6-321e-4484-8c28-15e65e5dd0a2-premium-photo-1666632470596-d5d237620996.webp	847419d0-aa73-480b-a563-84bc11e7ba29	2026-01-05 15:09:50.36628	2026-01-05 15:09:50.366281	f
4082bda3-b65e-41bf-937d-3d7d338903ad	products/3cdae55e-2d1e-4247-93ae-904a5f426494-ayra-icons-website.webp	847419d0-aa73-480b-a563-84bc11e7ba29	2026-01-05 15:09:50.367243	2026-01-05 15:09:50.367244	f
e0388cbf-200a-4d45-9be0-74ced4979da5	products/9227c823-720a-44c9-b129-f4ce877e9531-candle-care-website.webp	847419d0-aa73-480b-a563-84bc11e7ba29	2026-01-05 15:09:50.367261	2026-01-05 15:09:50.367262	f
1b6e01e2-ebab-4202-8505-d1d1d1a86975	products/8d1ad133-8231-4160-805d-2560430ebf36-photo-1676129125365-8a9eda7d2fb0.webp	847419d0-aa73-480b-a563-84bc11e7ba29	2026-01-05 15:09:50.36728	2026-01-05 15:09:50.36728	t
849c7a64-c9a1-4c96-b091-ba99fdfc5557	products/32bdb670-ced9-40af-a3d5-af2c6f4c462e-photo-1676129125365-8a9eda7d2fb0.webp	847419d0-aa73-480b-a563-84bc11e7ba29	2026-01-05 15:09:50.367292	2026-01-05 15:09:50.367293	f
c60d6b8c-53fb-495d-8638-c7b6586850d9	products/bb21ebe2-5097-43eb-bd6b-d0f265fa6fcd-photo-1676129125365-8a9eda7d2fb0.webp	2ac112ac-98eb-43e3-bdec-93349792baad	2026-01-05 15:10:27.534583	2026-01-05 15:10:27.534587	t
4f6a6dda-6877-4614-9a82-09061c189022	products/b5a67910-86e9-4b74-bd4b-7a6f783b6e47-photo-1676129125365-8a9eda7d2fb0.webp	2ac112ac-98eb-43e3-bdec-93349792baad	2026-01-05 15:10:27.534713	2026-01-05 15:10:27.534713	f
f8c61852-9958-4d83-be51-aac093cd2f75	products/eaa4c979-362b-4fb1-8e59-d1a1b00a628f-premium-photo-1666632470596-d5d237620996.webp	2ac112ac-98eb-43e3-bdec-93349792baad	2026-01-05 15:10:27.535135	2026-01-05 15:10:27.535137	f
897a4a8b-3e71-4266-b8b2-516ad1563eee	products/f6543f71-c8a8-4505-93be-744d9b5cb3f5-candle-care-website.webp	2ac112ac-98eb-43e3-bdec-93349792baad	2026-01-05 15:10:27.535202	2026-01-05 15:10:27.535203	f
70f03227-fa20-4a65-9468-345dce20bfdd	products/ff237c77-4b61-4730-a662-ed90043aa24c-ayra-icons-website.webp	2ac112ac-98eb-43e3-bdec-93349792baad	2026-01-05 15:10:27.535232	2026-01-05 15:10:27.535233	f
3cb91814-b604-47b0-abd7-ada8dc4b0ead	products/19ae4630-6b25-4025-89ca-ab138d7476dc-download.jpeg	1ebea69e-bd7a-4b10-85ca-d28e94fbf5aa	2026-01-05 15:19:40.492342	2026-01-05 15:19:40.492344	f
e5f347c4-95f5-48a0-b88c-dd46ae07e117	products/7e11db83-f4d2-4544-859f-e2f463b6759c-download-2-.jpeg	1ebea69e-bd7a-4b10-85ca-d28e94fbf5aa	2026-01-05 15:19:40.492385	2026-01-05 15:19:40.492385	f
9568a1be-3b1b-4d50-91e4-d780bfba2906	products/b1a19162-fd27-4d8f-9bb9-592cd32a3ef3-download-1-.jpeg	1ebea69e-bd7a-4b10-85ca-d28e94fbf5aa	2026-01-05 15:19:40.492399	2026-01-05 15:19:40.492399	t
fd7d939d-933d-4c2b-a2ff-6cf8794efa7d	products/1a08a316-6116-4ce6-b3a4-278616b43745-download-3-.jpeg	94b9c2bf-9eb3-4047-9a1e-af3fd8491523	2026-01-05 15:26:21.500398	2026-01-05 15:26:21.500399	t
c3068dfa-cddd-4450-95c4-05bafcf52120	products/a67bbdf8-b753-40c6-8c74-bb503c96bab3-images.jpeg	94b9c2bf-9eb3-4047-9a1e-af3fd8491523	2026-01-05 15:26:21.500482	2026-01-05 15:26:21.500483	f
85e8be4d-8e30-48ca-9ca0-84b3451d495a	products/6db284c5-c09d-40b5-8950-526d5757c122-download-3-.jpeg	3cc6b790-29d9-4503-85d2-ba7ee2be5623	2026-01-05 15:37:55.614013	2026-01-05 15:37:55.614014	t
4e8760de-6b6d-4d8b-9b09-ac6d9f71bf88	products/fe7d74a5-01fd-4f61-a7aa-eaee5fcd628f-download-3-.jpeg	3cc6b790-29d9-4503-85d2-ba7ee2be5623	2026-01-05 15:37:55.614054	2026-01-05 15:37:55.614054	f
8115125f-92cd-4bf2-8731-41c006c2bfa9	products/f18245b0-422b-45fa-aecd-a1841018b381-61ddeq6isgl.-ac-uf1000-1000-ql80-.jpg	6a934f58-50c0-498b-8ccd-93a8a12d3d01	2026-01-05 15:39:07.439266	2026-01-05 15:39:07.439267	f
f5092d47-4685-4aa0-89b6-88ae8c646780	products/614e74ef-a38d-485d-bbd0-97213bd2a6bd-ayra-icons-website.webp	6a934f58-50c0-498b-8ccd-93a8a12d3d01	2026-01-05 15:39:07.439339	2026-01-05 15:39:07.439339	f
538b1aa1-af71-4c35-93f9-8d21cc06ea5d	products/3c7b5b3f-3527-4e8a-b0cc-f092f979d38a-2-25653736-ee6f-4624-abd2-f703d932ba76.webp	6a934f58-50c0-498b-8ccd-93a8a12d3d01	2026-01-05 15:39:07.439364	2026-01-05 15:39:07.439365	f
35df130c-12f3-44c7-aab1-f1c631f8bfa3	products/08892066-2970-495f-bb79-c7ab929163c1-candle-care-website.webp	6a934f58-50c0-498b-8ccd-93a8a12d3d01	2026-01-05 15:39:07.439396	2026-01-05 15:39:07.439396	f
5de9cd48-950f-4806-98dd-7570c00cc9a3	products/eb8b00be-80cd-4fea-856e-b79428e04a7d-studioakiyowebsite-clamshell5-249a8e2e-54d4-4649-8189-f5584636f452.jpg	6a934f58-50c0-498b-8ccd-93a8a12d3d01	2026-01-05 15:39:07.439423	2026-01-05 15:39:07.439423	t
ac83664a-49d4-41e2-a48a-d3ed43d89407	products/bb1e2468-7519-4e9a-b5ab-4291939ce85a-2-25653736-ee6f-4624-abd2-f703d932ba76.webp	eb93907d-52fe-40c5-b56e-48a52a54ff8b	2026-01-05 15:40:03.454603	2026-01-05 15:40:03.454607	f
b5f8df16-b669-4c95-a0c2-53ae5ac8448a	products/0f179103-786c-4150-9e6e-b48426df2630-61ddeq6isgl.-ac-uf1000-1000-ql80-.jpg	eb93907d-52fe-40c5-b56e-48a52a54ff8b	2026-01-05 15:40:03.454748	2026-01-05 15:40:03.454749	f
e8d5ef67-a700-43f6-9180-1f6283eac986	products/1f5fa435-2681-45c7-96d1-3942ce0915c7-ayra-icons-website.webp	eb93907d-52fe-40c5-b56e-48a52a54ff8b	2026-01-05 15:40:03.454788	2026-01-05 15:40:03.454789	f
7a03d868-d2cc-4a5d-aa94-6a897f72fb82	products/3e85fe81-5a26-40bf-b3e7-0e03d34d1fa2-61ddeq6isgl.-ac-uf1000-1000-ql80-.jpg	eb93907d-52fe-40c5-b56e-48a52a54ff8b	2026-01-05 15:40:03.454876	2026-01-05 15:40:03.454877	t
017f6567-4060-4015-844b-2369519f944f	products/711860e6-37bb-438e-ac30-2d755a3d1812-studioakiyowebsite-clamshell5-249a8e2e-54d4-4649-8189-f5584636f452.jpg	eb93907d-52fe-40c5-b56e-48a52a54ff8b	2026-01-05 15:40:03.454912	2026-01-05 15:40:03.454912	f
eebad626-4250-4c88-a3c8-43db07bc29df	products/247b2a49-8c77-4403-a8c2-6076b629b0ca-91apowxhfel.-sl1500-.jpg	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.94382	2026-01-05 15:50:26.943826	f
3779c51e-8901-4ef5-a4a7-1ac79c12ee9e	products/94de7dd3-f37c-4eef-bee8-156f00f0b4c3-91na-x6nn4l.-sl1500-.jpg	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.943974	2026-01-05 15:50:26.943975	f
81d214d0-7db5-4e61-8af3-89222606003c	products/f858a389-4931-461c-a4e7-b6bbb8c36139-81fogwkn8-l.-sl1500-.jpg	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.944103	2026-01-05 15:50:26.944104	f
ac1fe866-7131-4f70-b778-2f511291fa90	products/94965603-666f-4a80-b47c-66255292b7c6-81b-4zbovyl.-sl1500-.jpg	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.94413	2026-01-05 15:50:26.944131	t
7eb56686-fc1b-4ae6-bc25-927fe204e307	products/2f43b42d-208e-4312-93e5-b89c115b055a-81qi-rxqgnl.-sl1500-.jpg	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.944154	2026-01-05 15:50:26.944154	f
5d6fd11c-d911-4238-9e5b-476f6bd2b6a2	products/e99e36b6-28cd-4318-b046-c1115fcdbebb-candle-care-website.webp	8c3d56ab-640f-42fd-aebe-fc6a6d441db9	2026-01-05 15:50:26.944176	2026-01-05 15:50:26.944177	f
d4edab19-e7ba-4493-a8ca-2fbed8372d88	products/1d4a40b5-b403-4e2f-bce9-b66720e7f89b-51p-7wwantl.-sl1080-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.226412	2026-01-05 15:58:06.226415	f
e822d340-ddcc-4dfd-9f7e-12ac5c1b071a	products/f43e5638-caf6-428a-b53a-9b30b4b68240-61ko65y-eol.-sl1080-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.226484	2026-01-05 15:58:06.226485	t
eb6a2d7b-7785-4da6-8d82-b42a2723930f	products/dbe6b57b-99d8-4d44-ad50-17caf6ed05b7-61qblm2fdxl.-sl1080-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.227319	2026-01-05 15:58:06.22732	f
6f46a0f9-e5b7-4ab7-9a37-d39bccb17fb4	products/5dce5005-cbef-41c5-8c69-eb765392f70a-ayra-icons-website.webp	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.227369	2026-01-05 15:58:06.22737	f
f3a15c11-4bb1-482b-a91d-52ef70e722c0	products/20da673c-ceb9-46ae-a462-9ac63f28433b-71-bsjwdk2l.-sl1500-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.227399	2026-01-05 15:58:06.227399	f
b1901947-f43d-4cc5-846e-1428368a6a22	products/726f51d1-0575-4e72-b55d-c4c34aa367ff-61odmf3s5gl.-sl1073-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.22743	2026-01-05 15:58:06.22743	f
d2c18910-3a12-4ba1-8230-3fd6dbe4a84b	products/fa98bcad-c1a0-4a65-9e70-3b14bea9df11-51zqpgsde-l.-sl1080-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.227456	2026-01-05 15:58:06.227456	f
4197724b-a5aa-4dff-ab97-5a6db8e5b3e7	products/dec58f79-bf2f-450e-a83c-63e8feb4e69f-61ko65y-eol.-sl1080-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.227488	2026-01-05 15:58:06.227489	f
352359a1-2709-4a66-8ff8-38347fdb3dd3	products/294fd359-2478-4710-8709-d6f7658b79c8-candle-care-website.webp	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.227516	2026-01-05 15:58:06.227518	f
1c187057-689f-41da-a9a5-c5daefd2673a	products/4dbb81d1-25c7-4e8c-914a-c00e7c97d4c1-51bd5xfiesl.-sl1080-.jpg	aa41f814-ab41-4f71-91c8-56a607328dfb	2026-01-05 15:58:06.22757	2026-01-05 15:58:06.227571	f
da48b367-62d3-4c85-a12a-fd18b2ba4c2b	products/9c9adf93-0fa6-4359-b5dd-3b217e627ce6-71fud638cwl.-sl1500-.jpg	2c3bee41-73f7-472b-9cd1-b2515030d14f	2026-01-05 16:10:17.335483	2026-01-05 16:10:17.335488	f
31dbdb83-1c33-4015-b532-4346ba324368	products/c2278f60-a497-4416-a811-a50e9a9f1b5e-81tw01dbx9l.-sl1500-.jpg	2c3bee41-73f7-472b-9cd1-b2515030d14f	2026-01-05 16:10:17.335585	2026-01-05 16:10:17.335586	t
494efdb2-26e3-4a41-a40d-201a6929d6ba	products/597a01c0-d020-4b0d-b906-e70bc0675153-814fwd5lnhl.-sl1500-.jpg	2c3bee41-73f7-472b-9cd1-b2515030d14f	2026-01-05 16:10:17.335627	2026-01-05 16:10:17.335627	f
93d23ae2-9cd6-426f-8f09-6dfe8a7366e1	products/8f3da8b6-446b-4b21-ab8d-996606a62c81-candle-care-website.webp	2c3bee41-73f7-472b-9cd1-b2515030d14f	2026-01-05 16:10:17.335678	2026-01-05 16:10:17.335678	f
d29b58a9-4818-4df5-a63e-6f5c136404b9	products/b5a76433-7bf7-4816-b5bb-3cb74ebe08ac-bee-wax.png	2c3bee41-73f7-472b-9cd1-b2515030d14f	2026-01-05 16:10:17.335705	2026-01-05 16:10:17.335706	f
c178d57d-51a9-40a0-854a-f35c420c05c4	products/127f9a5b-10ce-4144-a3d5-72d426f53757-81bntmmiv6l.-sl1500-.jpg	2c3bee41-73f7-472b-9cd1-b2515030d14f	2026-01-05 16:10:17.337054	2026-01-05 16:10:17.337057	f
a4e55447-2447-41c3-9c71-3dbac328c7f3	products/62272533-872c-47dd-86b1-94f71d528340-71l8aw20ufl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046811	2026-01-05 16:13:04.046811	f
3b6160ff-e9cc-4d54-b591-43608c9b1299	products/c631b9d1-7932-4eec-95e7-f1d52bf421df-candle-care-website.webp	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046858	2026-01-05 16:13:04.046858	f
84a3db64-fe91-4e33-8ade-6a3334af543d	products/7801c434-6637-4d71-bc8e-704038aa75d6-61rhfuk3edl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046873	2026-01-05 16:13:04.046873	f
4784f672-7854-4285-9b16-093b3b01a980	products/c5907370-c4cc-45f4-8316-0a9dff4be17b-71g9beiwexl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046896	2026-01-05 16:13:04.046897	f
9c75015f-5628-43e1-8b53-e4743b4947ee	products/a5c262d2-fea2-4f97-ad9f-7b205bd1e28b-71pivlsw5cl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046909	2026-01-05 16:13:04.046909	f
a3816853-d867-4cc5-8e1c-c38aa7e7ba66	products/cd7fcdc7-f790-4f6c-92e1-dfa61cd5d10b-61j6txj9z6l.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046925	2026-01-05 16:13:04.046925	f
071b0f02-f526-4d6c-8093-2feadeb7fc2a	products/c6b02b28-6164-4b94-905e-f849ad01dfb3-71cuxvcaazl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046936	2026-01-05 16:13:04.046937	f
49ec6ae1-eb80-491f-a697-c7184241b65c	products/8ea4358b-6773-404a-8221-626470400339-6182h4cdnvl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.04695	2026-01-05 16:13:04.046951	f
40c4e455-8852-432c-aec0-1b985e0d6633	products/d7bba10f-5fda-4ec0-a978-1bad87cb9a98-71-okdbfp4l.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046964	2026-01-05 16:13:04.046964	f
2b910bd8-657a-4cb3-a97c-f5eb264b26e0	products/bee83ca2-39a7-4501-bfab-acd6624087d1-bee-wax.png	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.046975	2026-01-05 16:13:04.046975	f
1e0da47e-a9f1-436d-b617-5325d27c2c23	products/f1930c80-4a87-45f8-a6a4-00bba45a0e3c-71g9beiwexl.-sl1500-.jpg	dbce6a84-a9c1-4143-b24d-e5845a9e9422	2026-01-05 16:13:04.047818	2026-01-05 16:13:04.047819	t
baa6d389-22f2-4f74-b0c7-9bb06d1a362c	products/4eb911bc-cbb1-44f7-b8dd-bbe36227bf0f-candle-care-website.webp	d9059e83-f980-48c5-8075-e6fe3f54c515	2026-01-05 16:19:37.142333	2026-01-05 16:19:37.142337	f
7ea340a4-6b67-4898-adb4-9c1bf8edacd4	products/5e200614-f0ad-4ff4-8ba5-da7b86e5124d-610y8ywdu-l.-sl1500-.jpg	d9059e83-f980-48c5-8075-e6fe3f54c515	2026-01-05 16:19:37.142423	2026-01-05 16:19:37.142424	t
f577a876-9af8-4d7e-8def-1f66e637a23b	products/1d6406e6-685e-4ec7-b209-7cd043141ca7-61ku7d3z3bl.-sl1500-.jpg	d9059e83-f980-48c5-8075-e6fe3f54c515	2026-01-05 16:19:37.142453	2026-01-05 16:19:37.142454	f
08e39023-4e4a-4c2e-85cd-df1fe06e7463	products/2d3cbd78-7a50-4eb4-a0a4-607eed3d1127-coconut-wax.png	d9059e83-f980-48c5-8075-e6fe3f54c515	2026-01-05 16:19:37.142527	2026-01-05 16:19:37.142528	f
153c621d-9926-4988-876e-4ad304cde614	products/03ad8908-1430-4aca-a742-81d258d377fb-61poeoujgyl.-sl1500-.jpg	d9059e83-f980-48c5-8075-e6fe3f54c515	2026-01-05 16:19:37.142555	2026-01-05 16:19:37.142555	f
48ad4999-4055-4524-8660-5d500e76600b	products/21027f34-20bc-48c2-ac52-8d46e3b87aa5-61poeoujgyl.-sl1500-.jpg	d9428946-a934-42aa-82be-d31575241207	2026-01-05 16:20:24.216337	2026-01-05 16:20:24.216339	f
42a32070-c479-4ca0-8a1f-51b53dc2a11e	products/816fcc00-861b-4a13-9db7-f76176cf665a-610y8ywdu-l.-sl1500-.jpg	d9428946-a934-42aa-82be-d31575241207	2026-01-05 16:20:24.216403	2026-01-05 16:20:24.216404	t
f0cc13f4-47e0-41d5-a23c-a63b0e40a87e	products/ab0d9cb0-a6f7-4ffb-a167-a4ef5543a241-61ku7d3z3bl.-sl1500-.jpg	d9428946-a934-42aa-82be-d31575241207	2026-01-05 16:20:24.216425	2026-01-05 16:20:24.216425	f
de5d703f-52a3-4dca-a7d9-19bcbd71693e	products/da14020a-25d5-4622-9fcb-fc6100808f42-candle-care-website.webp	d9428946-a934-42aa-82be-d31575241207	2026-01-05 16:20:24.216472	2026-01-05 16:20:24.216481	f
27425e61-e215-4cff-bea8-33262bd7a724	products/ec56640d-7e4a-4df6-8be1-ae437ecc8952-coconut-wax.png	d9428946-a934-42aa-82be-d31575241207	2026-01-05 16:20:24.216608	2026-01-05 16:20:24.216609	f
6a7076da-34aa-40a3-8ac5-f62a79ebd8dc	products/7d3fa3d6-7660-4d09-8736-bebc39e8ebce-61ku7d3z3bl.-sl1500-.jpg	f1619b2f-66d4-415c-b987-d346837ac95e	2026-01-05 16:20:58.279025	2026-01-05 16:20:58.279026	f
ba10a9b8-2ab0-45c9-819e-749af39dbd78	products/3c8410c0-397b-4b49-8ca0-4fe2ede2b9ef-610y8ywdu-l.-sl1500-.jpg	f1619b2f-66d4-415c-b987-d346837ac95e	2026-01-05 16:20:58.2791	2026-01-05 16:20:58.279101	t
972c6e5e-6976-4fa7-93e5-979a26b1062f	products/22b6c52e-22c1-4b45-a421-e1bb8ed165e1-coconut-wax.png	f1619b2f-66d4-415c-b987-d346837ac95e	2026-01-05 16:20:58.279123	2026-01-05 16:20:58.279124	f
9c9480d5-9864-4f96-b913-ca00853334f0	products/35455ddf-b18e-4e0b-beec-143bfc483797-61poeoujgyl.-sl1500-.jpg	f1619b2f-66d4-415c-b987-d346837ac95e	2026-01-05 16:20:58.279146	2026-01-05 16:20:58.279147	f
646661b4-02d8-45a0-a03d-47336d24a1ae	products/7b857aea-b516-46bb-af46-023ec6bb2168-candle-care-website.webp	f1619b2f-66d4-415c-b987-d346837ac95e	2026-01-05 16:20:58.279163	2026-01-05 16:20:58.279164	f
\.


--
-- Data for Name: product_item_variant_attributes; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.product_item_variant_attributes (product_item_id, variant_attribute_id) FROM stdin;
ab7c79dd-e723-4558-8f13-31f365340e6e	215a7094-29bd-49e8-b3b1-222033762b83
ab7c79dd-e723-4558-8f13-31f365340e6e	6bb09238-2ce0-488c-bc1b-32f2699c3dde
ab7c79dd-e723-4558-8f13-31f365340e6e	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
33d7465d-9b40-40f7-b600-83d3111d71a5	215a7094-29bd-49e8-b3b1-222033762b83
33d7465d-9b40-40f7-b600-83d3111d71a5	155aef91-454b-4619-9794-9011afd0b384
33d7465d-9b40-40f7-b600-83d3111d71a5	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
f2aa60ed-f4b5-4cdb-86cb-c4a4c4e72bbf	215a7094-29bd-49e8-b3b1-222033762b83
f2aa60ed-f4b5-4cdb-86cb-c4a4c4e72bbf	5f891bfc-bb21-4acc-8cf4-bc680f9315df
f2aa60ed-f4b5-4cdb-86cb-c4a4c4e72bbf	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
ae68932f-cafa-4b87-9172-9f31e29435e4	f0f569b9-b6f1-4a89-817e-75a091b96d13
ae68932f-cafa-4b87-9172-9f31e29435e4	609cc553-acd1-4722-b23f-f5a685b63cf8
ae68932f-cafa-4b87-9172-9f31e29435e4	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
601f2670-aca3-4392-b57b-8ad1a1606463	f0f569b9-b6f1-4a89-817e-75a091b96d13
601f2670-aca3-4392-b57b-8ad1a1606463	9fead3bd-d256-4274-b904-b59388b0bea8
601f2670-aca3-4392-b57b-8ad1a1606463	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
a87dac27-53ff-4dde-9e52-708b76abc395	c9da09fe-faeb-4654-9443-81217fc06787
a87dac27-53ff-4dde-9e52-708b76abc395	ed73804f-1c4f-4ce2-869e-702cb4ca2c2f
3900c33c-7bb1-41d8-b295-7c3765f70827	c9da09fe-faeb-4654-9443-81217fc06787
3900c33c-7bb1-41d8-b295-7c3765f70827	8fe76da1-765b-4855-a76c-2fb6f521c02f
531c358d-21cc-40c8-b774-a0a3984ef4a3	34c5c4fb-6366-48b6-9526-4b6a6adc1fd8
531c358d-21cc-40c8-b774-a0a3984ef4a3	377f0f47-ccc3-4331-b2a5-a40bf7c02a6e
531c358d-21cc-40c8-b774-a0a3984ef4a3	03af96e4-21c8-4fbd-ade9-bd0ce9287868
531c358d-21cc-40c8-b774-a0a3984ef4a3	628fff98-9316-4278-a3db-cc0613ad7890
03212376-e58a-4c34-bab3-999481f1f420	215a7094-29bd-49e8-b3b1-222033762b83
03212376-e58a-4c34-bab3-999481f1f420	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
03212376-e58a-4c34-bab3-999481f1f420	6be77332-9278-4c47-b0f7-311ef8792b9f
f903617e-d442-49e2-a036-f4e9b9205557	f0f569b9-b6f1-4a89-817e-75a091b96d13
f903617e-d442-49e2-a036-f4e9b9205557	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
f903617e-d442-49e2-a036-f4e9b9205557	6be77332-9278-4c47-b0f7-311ef8792b9f
11b1a9ca-8774-468a-b1ba-52dd4ebaab36	d82ecc97-42fc-4284-abb2-e675a9d4cd62
11b1a9ca-8774-468a-b1ba-52dd4ebaab36	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
11b1a9ca-8774-468a-b1ba-52dd4ebaab36	6be77332-9278-4c47-b0f7-311ef8792b9f
21d908ac-1cad-42f4-936d-a2c7e4feb432	179725dc-2178-469b-8eca-01cbdc01a5e0
21d908ac-1cad-42f4-936d-a2c7e4feb432	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
21d908ac-1cad-42f4-936d-a2c7e4feb432	6be77332-9278-4c47-b0f7-311ef8792b9f
e935ac03-4612-4c21-b07d-c0b938a08c3a	3b0b69ef-ad72-460a-8512-591ecf8f9d77
e935ac03-4612-4c21-b07d-c0b938a08c3a	9fead3bd-d256-4274-b904-b59388b0bea8
e935ac03-4612-4c21-b07d-c0b938a08c3a	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
821371e1-9ceb-4847-a4ab-f889b18788b2	179725dc-2178-469b-8eca-01cbdc01a5e0
821371e1-9ceb-4847-a4ab-f889b18788b2	424afb1e-22e0-4bf0-becd-559317274a2c
821371e1-9ceb-4847-a4ab-f889b18788b2	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
710f8fe9-4bac-433a-af7d-2f3e760958be	215a7094-29bd-49e8-b3b1-222033762b83
710f8fe9-4bac-433a-af7d-2f3e760958be	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
710f8fe9-4bac-433a-af7d-2f3e760958be	6be77332-9278-4c47-b0f7-311ef8792b9f
7ed05383-844f-4550-9297-a96396719214	179725dc-2178-469b-8eca-01cbdc01a5e0
7ed05383-844f-4550-9297-a96396719214	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
7ed05383-844f-4550-9297-a96396719214	6be77332-9278-4c47-b0f7-311ef8792b9f
2f5d34f8-f103-433e-adc7-afab24ff352f	155aef91-454b-4619-9794-9011afd0b384
2f5d34f8-f103-433e-adc7-afab24ff352f	3b0b69ef-ad72-460a-8512-591ecf8f9d77
2f5d34f8-f103-433e-adc7-afab24ff352f	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
bd0f5a8d-0f82-4e53-8c21-b8fd128b38f5	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
bd0f5a8d-0f82-4e53-8c21-b8fd128b38f5	215a7094-29bd-49e8-b3b1-222033762b83
bd0f5a8d-0f82-4e53-8c21-b8fd128b38f5	6be77332-9278-4c47-b0f7-311ef8792b9f
975a6992-92ea-4c45-acfa-f39aab3f4f26	179725dc-2178-469b-8eca-01cbdc01a5e0
975a6992-92ea-4c45-acfa-f39aab3f4f26	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
975a6992-92ea-4c45-acfa-f39aab3f4f26	6be77332-9278-4c47-b0f7-311ef8792b9f
8a751905-21c8-4f39-bccc-e20fe089a2da	3b0b69ef-ad72-460a-8512-591ecf8f9d77
8a751905-21c8-4f39-bccc-e20fe089a2da	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
8a751905-21c8-4f39-bccc-e20fe089a2da	6be77332-9278-4c47-b0f7-311ef8792b9f
26f7bcc3-883c-4df8-98aa-9298d510a32a	179725dc-2178-469b-8eca-01cbdc01a5e0
26f7bcc3-883c-4df8-98aa-9298d510a32a	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
26f7bcc3-883c-4df8-98aa-9298d510a32a	6be77332-9278-4c47-b0f7-311ef8792b9f
7ca46aba-57d6-47fb-a2a7-c58101815173	f0f569b9-b6f1-4a89-817e-75a091b96d13
7ca46aba-57d6-47fb-a2a7-c58101815173	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
7ca46aba-57d6-47fb-a2a7-c58101815173	6be77332-9278-4c47-b0f7-311ef8792b9f
7297b7c1-5daf-4bb4-97ae-9ab60f40c279	179725dc-2178-469b-8eca-01cbdc01a5e0
7297b7c1-5daf-4bb4-97ae-9ab60f40c279	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
7297b7c1-5daf-4bb4-97ae-9ab60f40c279	6be77332-9278-4c47-b0f7-311ef8792b9f
d7431371-e46a-4f03-975c-f60b5ee9208b	179725dc-2178-469b-8eca-01cbdc01a5e0
d7431371-e46a-4f03-975c-f60b5ee9208b	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
d7431371-e46a-4f03-975c-f60b5ee9208b	6be77332-9278-4c47-b0f7-311ef8792b9f
22ead325-bd6b-4bd0-8db4-f509271ae311	179725dc-2178-469b-8eca-01cbdc01a5e0
22ead325-bd6b-4bd0-8db4-f509271ae311	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
22ead325-bd6b-4bd0-8db4-f509271ae311	6be77332-9278-4c47-b0f7-311ef8792b9f
c991924e-66db-41a8-ac75-b56ade3a1a2c	2bc441ab-fbb6-4109-a17f-31e46c17c49e
c991924e-66db-41a8-ac75-b56ade3a1a2c	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
c991924e-66db-41a8-ac75-b56ade3a1a2c	6be77332-9278-4c47-b0f7-311ef8792b9f
fc6a0386-84b2-4844-809f-499b0e360991	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
fc6a0386-84b2-4844-809f-499b0e360991	215a7094-29bd-49e8-b3b1-222033762b83
fc6a0386-84b2-4844-809f-499b0e360991	6be77332-9278-4c47-b0f7-311ef8792b9f
b0e785bb-6750-4e18-ba27-cd7d487f7c62	424afb1e-22e0-4bf0-becd-559317274a2c
b0e785bb-6750-4e18-ba27-cd7d487f7c62	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
b0e785bb-6750-4e18-ba27-cd7d487f7c62	31e55912-22f1-4ba0-86ed-e1222f29f4a9
fbd789db-00bb-4926-a58d-9be527655cbd	9fead3bd-d256-4274-b904-b59388b0bea8
fbd789db-00bb-4926-a58d-9be527655cbd	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
fbd789db-00bb-4926-a58d-9be527655cbd	31e55912-22f1-4ba0-86ed-e1222f29f4a9
734480a9-c612-4b70-961c-636c83447fed	31e55912-22f1-4ba0-86ed-e1222f29f4a9
734480a9-c612-4b70-961c-636c83447fed	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
734480a9-c612-4b70-961c-636c83447fed	609cc553-acd1-4722-b23f-f5a685b63cf8
dc24f8a5-0034-46c9-814a-c754a963ea96	424afb1e-22e0-4bf0-becd-559317274a2c
dc24f8a5-0034-46c9-814a-c754a963ea96	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
dc24f8a5-0034-46c9-814a-c754a963ea96	373c36d6-cb9b-4b0a-88d6-9445e1f4c70b
62784a33-88c8-462c-a39a-0b6f94b6c25f	609cc553-acd1-4722-b23f-f5a685b63cf8
62784a33-88c8-462c-a39a-0b6f94b6c25f	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
62784a33-88c8-462c-a39a-0b6f94b6c25f	373c36d6-cb9b-4b0a-88d6-9445e1f4c70b
323a581b-3793-4b37-ac85-5541b63f0cd8	d82ecc97-42fc-4284-abb2-e675a9d4cd62
323a581b-3793-4b37-ac85-5541b63f0cd8	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
323a581b-3793-4b37-ac85-5541b63f0cd8	6be77332-9278-4c47-b0f7-311ef8792b9f
3cd7abac-a19a-4498-8421-a23f0c27ebcd	179725dc-2178-469b-8eca-01cbdc01a5e0
3cd7abac-a19a-4498-8421-a23f0c27ebcd	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
3cd7abac-a19a-4498-8421-a23f0c27ebcd	6be77332-9278-4c47-b0f7-311ef8792b9f
8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	179725dc-2178-469b-8eca-01cbdc01a5e0
8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	6be77332-9278-4c47-b0f7-311ef8792b9f
13065e53-f6b2-4cd7-b9eb-5e62f223d825	179725dc-2178-469b-8eca-01cbdc01a5e0
13065e53-f6b2-4cd7-b9eb-5e62f223d825	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
13065e53-f6b2-4cd7-b9eb-5e62f223d825	6be77332-9278-4c47-b0f7-311ef8792b9f
2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	179725dc-2178-469b-8eca-01cbdc01a5e0
2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	6be77332-9278-4c47-b0f7-311ef8792b9f
6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	215a7094-29bd-49e8-b3b1-222033762b83
6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	424afb1e-22e0-4bf0-becd-559317274a2c
98c4fe67-b0d7-45ea-a4b4-bf43e765021c	215a7094-29bd-49e8-b3b1-222033762b83
98c4fe67-b0d7-45ea-a4b4-bf43e765021c	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
98c4fe67-b0d7-45ea-a4b4-bf43e765021c	6be77332-9278-4c47-b0f7-311ef8792b9f
74228e37-16c6-4dc5-a342-66f766a861fc	f0f569b9-b6f1-4a89-817e-75a091b96d13
74228e37-16c6-4dc5-a342-66f766a861fc	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
74228e37-16c6-4dc5-a342-66f766a861fc	6be77332-9278-4c47-b0f7-311ef8792b9f
847419d0-aa73-480b-a563-84bc11e7ba29	3b0b69ef-ad72-460a-8512-591ecf8f9d77
847419d0-aa73-480b-a563-84bc11e7ba29	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
847419d0-aa73-480b-a563-84bc11e7ba29	6be77332-9278-4c47-b0f7-311ef8792b9f
2ac112ac-98eb-43e3-bdec-93349792baad	179725dc-2178-469b-8eca-01cbdc01a5e0
2ac112ac-98eb-43e3-bdec-93349792baad	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
2ac112ac-98eb-43e3-bdec-93349792baad	6be77332-9278-4c47-b0f7-311ef8792b9f
1ebea69e-bd7a-4b10-85ca-d28e94fbf5aa	b95be0ce-f397-4fe8-9edf-882034f9ffd3
1ebea69e-bd7a-4b10-85ca-d28e94fbf5aa	b6e8e76e-c919-48b2-8fbf-10ce492658a1
94b9c2bf-9eb3-4047-9a1e-af3fd8491523	215a7094-29bd-49e8-b3b1-222033762b83
94b9c2bf-9eb3-4047-9a1e-af3fd8491523	6bb09238-2ce0-488c-bc1b-32f2699c3dde
3cc6b790-29d9-4503-85d2-ba7ee2be5623	f0f569b9-b6f1-4a89-817e-75a091b96d13
3cc6b790-29d9-4503-85d2-ba7ee2be5623	6bb09238-2ce0-488c-bc1b-32f2699c3dde
6a934f58-50c0-498b-8ccd-93a8a12d3d01	3b0b69ef-ad72-460a-8512-591ecf8f9d77
6a934f58-50c0-498b-8ccd-93a8a12d3d01	6bb09238-2ce0-488c-bc1b-32f2699c3dde
eb93907d-52fe-40c5-b56e-48a52a54ff8b	2bc441ab-fbb6-4109-a17f-31e46c17c49e
eb93907d-52fe-40c5-b56e-48a52a54ff8b	6bb09238-2ce0-488c-bc1b-32f2699c3dde
8c3d56ab-640f-42fd-aebe-fc6a6d441db9	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
8c3d56ab-640f-42fd-aebe-fc6a6d441db9	6be77332-9278-4c47-b0f7-311ef8792b9f
8c3d56ab-640f-42fd-aebe-fc6a6d441db9	b927cd2d-baaa-4929-9d5c-e6c93984646e
aa41f814-ab41-4f71-91c8-56a607328dfb	0ed08ebc-b077-4321-ae3d-f9d6a5551fa6
aa41f814-ab41-4f71-91c8-56a607328dfb	6be77332-9278-4c47-b0f7-311ef8792b9f
aa41f814-ab41-4f71-91c8-56a607328dfb	b927cd2d-baaa-4929-9d5c-e6c93984646e
2c3bee41-73f7-472b-9cd1-b2515030d14f	792a3f28-b911-4595-abe3-fede10ab0e1e
2c3bee41-73f7-472b-9cd1-b2515030d14f	6be77332-9278-4c47-b0f7-311ef8792b9f
2c3bee41-73f7-472b-9cd1-b2515030d14f	83f663d7-5070-4f16-b43a-982d943093a5
dbce6a84-a9c1-4143-b24d-e5845a9e9422	792a3f28-b911-4595-abe3-fede10ab0e1e
dbce6a84-a9c1-4143-b24d-e5845a9e9422	6be77332-9278-4c47-b0f7-311ef8792b9f
dbce6a84-a9c1-4143-b24d-e5845a9e9422	83f663d7-5070-4f16-b43a-982d943093a5
d9059e83-f980-48c5-8075-e6fe3f54c515	215a7094-29bd-49e8-b3b1-222033762b83
d9059e83-f980-48c5-8075-e6fe3f54c515	6be77332-9278-4c47-b0f7-311ef8792b9f
d9059e83-f980-48c5-8075-e6fe3f54c515	64d01446-110c-457e-be6b-156fcdfa59f6
d9428946-a934-42aa-82be-d31575241207	f0f569b9-b6f1-4a89-817e-75a091b96d13
d9428946-a934-42aa-82be-d31575241207	6be77332-9278-4c47-b0f7-311ef8792b9f
d9428946-a934-42aa-82be-d31575241207	64d01446-110c-457e-be6b-156fcdfa59f6
f1619b2f-66d4-415c-b987-d346837ac95e	3b0b69ef-ad72-460a-8512-591ecf8f9d77
f1619b2f-66d4-415c-b987-d346837ac95e	6be77332-9278-4c47-b0f7-311ef8792b9f
f1619b2f-66d4-415c-b987-d346837ac95e	64d01446-110c-457e-be6b-156fcdfa59f6
\.


--
-- Data for Name: product_items; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.product_items (id, sku, available_stock, base_price, discounted_price, product_id, created_at, updated_at) FROM stdin;
fc6a0386-84b2-4844-809f-499b0e360991	RCSC-LAVENDER-ONESIZE-SOY_WAX-34486	100	500.00	420.00	df2b1eac-0941-4519-9b49-456f03b5c749	2026-01-05 14:16:47.740567	2026-01-05 14:17:03.493194
b0e785bb-6750-4e18-ba27-cd7d487f7c62	JDJC-JASMINE-SMALL-SOY_WAX-61603	100	300.00	280.00	970448f4-c37d-4cc8-b46f-07bf96ecf722	2026-01-05 14:28:55.222136	2026-01-05 14:28:55.222146
fbd789db-00bb-4926-a58d-9be527655cbd	JDJC-JASMINE-LARGE-SOY_WAX-38273	100	500.00	450.00	970448f4-c37d-4cc8-b46f-07bf96ecf722	2026-01-05 14:30:02.438304	2026-01-05 14:30:02.438325
734480a9-c612-4b70-961c-636c83447fed	JDJC-JASMINE-MEDIUM-SOY_WAX-99980	100	400.00	380.00	970448f4-c37d-4cc8-b46f-07bf96ecf722	2026-01-05 14:29:26.244471	2026-01-05 14:30:14.840867
dc24f8a5-0034-46c9-814a-c754a963ea96	MNJC-MOGRA-SMALL-SOY_WAX-81834	100	300.00	280.00	0f142b6b-ac32-454c-801a-c0ca3d78d1ad	2026-01-05 14:37:45.938424	2026-01-05 14:40:41.524176
62784a33-88c8-462c-a39a-0b6f94b6c25f	MNJC-MOGRA-MEDIUM-SOY_WAX-88534	100	400.00	380.00	0f142b6b-ac32-454c-801a-c0ca3d78d1ad	2026-01-05 14:41:54.262509	2026-01-05 14:41:54.262536
323a581b-3793-4b37-ac85-5541b63f0cd8	BRSC-ROSE-ONESIZE-SOY_WAX-90873	900	400.00	350.00	8886cdfd-2a6c-4067-998d-6df2ddabc3b9	2026-01-05 14:50:02.016641	2026-01-05 14:50:02.017099
3cd7abac-a19a-4498-8421-a23f0c27ebcd	MTBC-UNSCENTED-ONESIZE-SOY_WAX-38649	1000	150.00	100.00	83d672be-097e-4c84-9a7c-eb3c20a8b7ca	2026-01-05 14:54:03.530477	2026-01-05 14:54:03.530727
ab7c79dd-e723-4558-8f13-31f365340e6e	LBC-LAVENDER-100GM-SOY_WAX-65501	120	450.00	400.00	1e9b3e27-e262-4bd1-8ce6-9f45306a31e3	2026-01-05 09:53:43.400017	2026-01-05 09:53:43.400029
33d7465d-9b40-40f7-b600-83d3111d71a5	LBC-LAVENDER-200GM-SOY_WAX-23397	50	750.00	650.00	1e9b3e27-e262-4bd1-8ce6-9f45306a31e3	2026-01-05 09:57:15.852237	2026-01-05 09:57:15.852246
f2aa60ed-f4b5-4cdb-86cb-c4a4c4e72bbf	LBC-LAVENDER-300GM-SOY_WAX-52980	20	950.00	750.00	1e9b3e27-e262-4bd1-8ce6-9f45306a31e3	2026-01-05 10:00:35.322067	2026-01-05 10:00:35.322077
ae68932f-cafa-4b87-9172-9f31e29435e4	VCC-VANILLA-MEDIUM-SOY_WAX-93867	50	650.00	550.00	966a44be-e217-4a38-8559-46c11e18dcbb	2026-01-05 10:06:57.482334	2026-01-05 10:06:57.482352
601f2670-aca3-4392-b57b-8ad1a1606463	VCC-VANILLA-LARGE-SOY_WAX-73192	20	950.00	700.00	966a44be-e217-4a38-8559-46c11e18dcbb	2026-01-05 10:10:12.024556	2026-01-05 10:10:12.024567
a87dac27-53ff-4dde-9e52-708b76abc395	MGCH-GLASS-TRANSPARENT-33196	50	650.00	350.00	ae87ff33-1c9d-489c-9541-f6f071d01686	2026-01-05 10:14:11.658782	2026-01-05 10:14:11.658794
3900c33c-7bb1-41d8-b295-7c3765f70827	MGCH-GLASS-AMBER-33317	50	550.00	400.00	ae87ff33-1c9d-489c-9541-f6f071d01686	2026-01-05 10:16:18.154166	2026-01-05 10:16:18.154384
531c358d-21cc-40c8-b774-a0a3984ef4a3	MCWMB-CERAMIC-WHITE-TEA_LIGHT-FIRE-60301	150	350.00	200.00	4ce25ebb-5a46-4f44-b5b3-cbf11d087b9d	2026-01-05 11:29:22.242419	2026-01-05 11:29:22.242429
03212376-e58a-4c34-bab3-999481f1f420	MCSC-LAVENDER-ONESIZE-SOY_WAX-76633	100	500.00	400.00	67b431da-fa86-4fbf-9386-1c7099aa9141	2026-01-05 13:17:21.730695	2026-01-05 13:17:21.730709
f903617e-d442-49e2-a036-f4e9b9205557	MCSC-VANILLA-ONESIZE-SOY_WAX-22548	110	500.00	400.00	67b431da-fa86-4fbf-9386-1c7099aa9141	2026-01-05 13:18:21.501684	2026-01-05 13:18:21.50169
11b1a9ca-8774-468a-b1ba-52dd4ebaab36	MCSC-ROSE-ONESIZE-SOY_WAX-40118	10	500.00	300.00	67b431da-fa86-4fbf-9386-1c7099aa9141	2026-01-05 13:19:22.527744	2026-01-05 13:19:22.527754
21d908ac-1cad-42f4-936d-a2c7e4feb432	MCSC-UNSCENTED-ONESIZE-SOY_WAX-37466	110	500.00	400.00	67b431da-fa86-4fbf-9386-1c7099aa9141	2026-01-05 13:20:10.733604	2026-01-05 13:20:10.73361
e935ac03-4612-4c21-b07d-c0b938a08c3a	TCPC-SANDALWOOD-LARGE-SOY_WAX-33379	1000	300.00	200.00	492fe20d-555b-4544-95ab-1dc5d0b79beb	2026-01-05 13:36:07.562718	2026-01-05 13:36:07.562928
821371e1-9ceb-4847-a4ab-f889b18788b2	TCPC-UNSCENTED-SMALL-SOY_WAX-63094	1000	110.00	50.00	492fe20d-555b-4544-95ab-1dc5d0b79beb	2026-01-05 13:37:03.036904	2026-01-05 13:37:03.03691
710f8fe9-4bac-433a-af7d-2f3e760958be	GE3JC-LAVENDER-ONESIZE-SOY_WAX-55940	199	400.00	300.00	f217d402-07f9-487c-8076-f3c5c8352901	2026-01-05 13:42:19.801398	2026-01-05 13:42:19.801399
7ed05383-844f-4550-9297-a96396719214	GE3JC-UNSCENTED-ONESIZE-SOY_WAX-79267	100	500.00	300.00	f217d402-07f9-487c-8076-f3c5c8352901	2026-01-05 13:43:17.497069	2026-01-05 13:43:17.497076
2f5d34f8-f103-433e-adc7-afab24ff352f	TSSC-SANDALWOOD-200GM-SOY_WAX-77897	0	100.00	90.00	72227973-847c-455c-a1e8-dc6b4877c22e	2026-01-05 13:48:06.96873	2026-01-05 13:49:09.65162
bd0f5a8d-0f82-4e53-8c21-b8fd128b38f5	TSSC-LAVENDER-ONESIZE-SOY_WAX-57119	100	200.00	150.00	72227973-847c-455c-a1e8-dc6b4877c22e	2026-01-05 13:50:07.777896	2026-01-05 13:51:17.587695
975a6992-92ea-4c45-acfa-f39aab3f4f26	TSSC-UNSCENTED-ONESIZE-SOY_WAX-33827	100	250.00	200.00	72227973-847c-455c-a1e8-dc6b4877c22e	2026-01-05 13:52:07.015666	2026-01-05 13:52:07.01567
8a751905-21c8-4f39-bccc-e20fe089a2da	RVFC-SANDALWOOD-ONESIZE-SOY_WAX-91146	100	300.00	200.00	34f1458b-d484-4eb6-b7aa-28289ba0446c	2026-01-05 13:54:59.479807	2026-01-05 13:54:59.479814
26f7bcc3-883c-4df8-98aa-9298d510a32a	RVFC-UNSCENTED-ONESIZE-SOY_WAX-41737	100	400.00	300.00	34f1458b-d484-4eb6-b7aa-28289ba0446c	2026-01-05 13:55:45.432639	2026-01-05 13:55:45.432644
7ca46aba-57d6-47fb-a2a7-c58101815173	RVFC-VANILLA-ONESIZE-SOY_WAX-57304	100	400.00	350.00	34f1458b-d484-4eb6-b7aa-28289ba0446c	2026-01-05 13:57:48.340798	2026-01-05 13:57:48.340805
7297b7c1-5daf-4bb4-97ae-9ab60f40c279	LSPC-UNSCENTED-ONESIZE-SOY_WAX-75232	11	500.00	450.00	fe6d07e9-3907-4df8-a8de-fa78e0fd8c6a	2026-01-05 14:02:53.151983	2026-01-05 14:02:53.151989
d7431371-e46a-4f03-975c-f60b5ee9208b	STPC-UNSCENTED-ONESIZE-SOY_WAX-99124	1000	500.00	450.00	b3d78d7a-ddd3-4473-97df-697d3c5331e1	2026-01-05 14:05:30.194298	2026-01-05 14:05:30.194308
22ead325-bd6b-4bd0-8db4-f509271ae311	LBCC-UNSCENTED-ONESIZE-SOY_WAX-77600	100	1000.00	800.00	2520fb28-b50a-41a5-82a7-bb8da10c5220	2026-01-05 14:10:57.351099	2026-01-05 14:10:57.351106
c991924e-66db-41a8-ac75-b56ade3a1a2c	RCSC-CITRUS-ONESIZE-SOY_WAX-23431	100	500.00	400.00	df2b1eac-0941-4519-9b49-456f03b5c749	2026-01-05 14:16:12.383198	2026-01-05 14:16:12.383217
8d5e2c25-dd6c-4670-adf8-50ffa8d1ca8d	MLC-UNSCENTED-ONESIZE-SOY_WAX-71945	1000	150.00	100.00	07d31de1-de43-43bd-88cf-d4cfe9c72aed	2026-01-05 14:56:22.628147	2026-01-05 14:56:22.628152
13065e53-f6b2-4cd7-b9eb-5e62f223d825	MRC-UNSCENTED-ONESIZE-SOY_WAX-30998	1000	150.00	100.00	49e0e569-f2d8-4e7a-9485-5d3aba589c14	2026-01-05 15:00:02.587423	2026-01-05 15:00:02.587429
2e402f5b-a4de-4b9f-a0a3-31ff113f00dd	MMC-UNSCENTED-ONESIZE-SOY_WAX-90109	1000	1500.00	100.00	2a8ef4c3-8efe-4513-b49d-5017b4d31420	2026-01-05 15:03:40.739096	2026-01-05 15:03:40.739115
6d1b3b9d-7abc-455a-9d35-8d86d2d7260d	MJC-LAVENDER-SMALL-SOY_WAX-48502	0	100.00	70.00	2cf3a8ed-53d9-4f6d-9c27-5ca346261b43	2026-01-05 15:07:25.7928	2026-01-05 15:08:03.855488
98c4fe67-b0d7-45ea-a4b4-bf43e765021c	MJC-LAVENDER-ONESIZE-SOY_WAX-92001	1000	100.00	70.00	2cf3a8ed-53d9-4f6d-9c27-5ca346261b43	2026-01-05 15:08:36.93094	2026-01-05 15:08:36.930949
74228e37-16c6-4dc5-a342-66f766a861fc	MJC-VANILLA-ONESIZE-SOY_WAX-19239	1000	100.00	70.00	2cf3a8ed-53d9-4f6d-9c27-5ca346261b43	2026-01-05 15:09:09.622172	2026-01-05 15:09:09.622179
847419d0-aa73-480b-a563-84bc11e7ba29	MJC-SANDALWOOD-ONESIZE-SOY_WAX-18195	1000	100.00	70.00	2cf3a8ed-53d9-4f6d-9c27-5ca346261b43	2026-01-05 15:09:50.365859	2026-01-05 15:09:50.365866
2ac112ac-98eb-43e3-bdec-93349792baad	MJC-UNSCENTED-ONESIZE-SOY_WAX-26914	1000	100.00	70.00	2cf3a8ed-53d9-4f6d-9c27-5ca346261b43	2026-01-05 15:10:27.533577	2026-01-05 15:10:27.53359
1ebea69e-bd7a-4b10-85ca-d28e94fbf5aa	WT-METAL-BLACK-66755	100	100.00	90.00	fcc42ad1-9a1c-45cf-a50e-547d9e86e451	2026-01-05 15:19:40.490466	2026-01-05 15:19:40.490473
94b9c2bf-9eb3-4047-9a1e-af3fd8491523	WM–R-100GM-LAVENDER-23710	1000	500.00	450.00	717e1e09-9f0a-4f47-b717-5e04b5c53c5b	2026-01-05 15:26:21.499278	2026-01-05 15:37:09.988857
3cc6b790-29d9-4503-85d2-ba7ee2be5623	WM–R-VANILLA-100GM-82189	100	500.00	450.00	717e1e09-9f0a-4f47-b717-5e04b5c53c5b	2026-01-05 15:37:55.612582	2026-01-05 15:37:55.612588
6a934f58-50c0-498b-8ccd-93a8a12d3d01	WM–C-SANDALWOOD-100GM-99033	100	500.00	450.00	cd3d6d00-43d8-4ae4-bb63-3576d635ec88	2026-01-05 15:39:07.438353	2026-01-05 15:39:07.438367
eb93907d-52fe-40c5-b56e-48a52a54ff8b	WM–C-CITRUS-100GM-83549	100	500.00	450.00	cd3d6d00-43d8-4ae4-bb63-3576d635ec88	2026-01-05 15:40:03.452291	2026-01-05 15:40:03.452312
8c3d56ab-640f-42fd-aebe-fc6a6d441db9	SJCS4|-MIX-ONESIZE-SOY_WAX-38171	100	899.00	799.00	81ea368d-fc28-4cda-90ee-171a19fb5b4f	2026-01-05 15:50:26.94198	2026-01-05 15:50:26.941994
aa41f814-ab41-4f71-91c8-56a607328dfb	SSCGS6-MIX-ONESIZE-SOY_WAX-46438	100	599.00	499.00	9d38126d-1030-45dd-b009-2f76f48095b5	2026-01-05 15:58:06.22323	2026-01-05 15:58:06.22325
2c3bee41-73f7-472b-9cd1-b2515030d14f	BPC-NATURAL_HONEY-ONESIZE-BEE_WAX-76707	100	500.00	400.00	7770c8b7-8e6f-4668-9585-cdd30d7219fd	2026-01-05 16:10:17.332991	2026-01-05 16:10:17.33301
dbce6a84-a9c1-4143-b24d-e5845a9e9422	BTC-NATURAL_HONEY-ONESIZE-BEE_WAX-54485	1000	500.00	450.00	9e6decec-adb2-4fb5-bc20-31b4400d4556	2026-01-05 16:13:04.046324	2026-01-05 16:13:04.046327
d9059e83-f980-48c5-8075-e6fe3f54c515	CLGJC-LAVENDER-ONESIZE-COCONUT_WAX-74827	1000	1299.00	999.00	25859f95-419a-4fe5-a352-bbcea7b66689	2026-01-05 16:19:37.140736	2026-01-05 16:19:37.140746
d9428946-a934-42aa-82be-d31575241207	CLGJC-VANILLA-ONESIZE-COCONUT_WAX-15188	1000	1299.00	999.00	25859f95-419a-4fe5-a352-bbcea7b66689	2026-01-05 16:20:24.214024	2026-01-05 16:20:24.214028
f1619b2f-66d4-415c-b987-d346837ac95e	CLGJC-SANDALWOOD-COCONUT_WAX-ONESIZE-91372	100	1299.00	999.00	25859f95-419a-4fe5-a352-bbcea7b66689	2026-01-05 16:20:58.278293	2026-01-05 16:20:58.278297
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.products (id, name, description, features, category_id, created_at, updated_at) FROM stdin;
72227973-847c-455c-a1e8-dc6b4877c22e	Tall Spiral Sculpted Candle	<p>The <strong>Tall Spiral Sculpted Candle</strong> is a striking blend of art and function, designed to elevate your space with its flowing, twisted form. Inspired by modern sculptural design, its tall spiral silhouette adds visual movement and depth, making it a standout décor piece even when unlit. Perfect for contemporary, minimal, or artistic interiors, this candle effortlessly draws attention without overwhelming the space.</p><p>Carefully crafted using a premium wax blend, the candle burns slowly and evenly, preserving its sculpted shape while creating a soft, warm glow. As the flame travels along the spiral form, it enhances the candle’s texture and contours, creating a calming and visually soothing experience. Ideal for styling on dining tables, shelves, consoles, or bedside corners, it brings elegance and character to any setting.</p><p>Whether used for ambiance, décor, or special moments, the <strong>Tall Spiral Sculpted Candle</strong> offers a refined balance of beauty and performance. Its unique form makes it an excellent choice for gifting—perfect for housewarmings, festive occasions, or anyone who appreciates artistic home accents and thoughtful design.</p>	<ul><li><p><strong>Tall spiral sculpted design</strong> with an artistic, modern appeal</p></li><li><p><strong>Premium-quality wax blend</strong> for a clean and even burn</p></li><li><p><strong>Slow-burning performance</strong> that maintains its sculptural form</p></li><li><p><strong>Soft, ambient glow</strong> that enhances texture and mood</p></li><li><p><strong>Versatile décor accent</strong> for modern and minimal interiors</p></li><li><p><strong>Unique, gift-worthy piece</strong> for special occasions</p></li></ul><p></p>	ad314150-7dbb-4e47-a4aa-6f9a31fa3876	2026-01-05 13:45:40.552662	2026-01-05 13:45:40.552753
1e9b3e27-e262-4bd1-8ce6-9f45306a31e3	Lavender Bliss Candle	<p>A calming lavender-scented candle made for relaxation and stress relief.</p>	<p>• Long burn time</p><p>• Clean fragrance throw</p><p>• Hand-poured</p>	122acd5e-6e4c-44b4-8e00-19a416ec17ec	2026-01-05 09:48:05.35342	2026-01-05 09:48:05.353445
966a44be-e217-4a38-8559-46c11e18dcbb	Vanilla Comfort Candle	<p>Warm vanilla aroma ideal for cozy evenings and home décor.</p>	<p>• Smooth vanilla scent</p><p>• Smokeless burn</p><p>• Premium wax blend</p>	122acd5e-6e4c-44b4-8e00-19a416ec17ec	2026-01-05 10:01:59.516083	2026-01-05 10:01:59.516114
ae87ff33-1c9d-489c-9541-f6f071d01686	Minimal Glass Candle Holder	<p>Modern glass holder suitable for all candle sizes.</p>	<p>• Heat resistant</p><p>• Minimal design</p><p>• Easy to clean</p>	addcdb4c-0fab-4ab0-af16-dcfd57bddf1f	2026-01-05 10:11:03.076214	2026-01-05 10:11:41.275684
4ce25ebb-5a46-4f44-b5b3-cbf11d087b9d	Minimal Ceramic Wax Melt Burner	<p>Elegant ceramic burner suitable for aroma tarts and wax melts.</p>	<p></p>	7f548075-6809-447c-be88-4f27f65bc0ae	2026-01-05 11:23:15.059402	2026-01-05 11:23:15.059421
67b431da-fa86-4fbf-9386-1c7099aa9141	Minimal Curved Shape Candle	<p>Designed for lovers of modern simplicity, the <strong>Minimal Curved Shape Candle</strong> blends soft curves with a sculptural silhouette. Its elegant form adds a refined, contemporary touch to any space—whether styled on a coffee table, shelf, or bedside. Perfect as both a décor accent and a calming candle experience.</p>	<ul><li><p><strong>Modern curved silhouette</strong> with a minimal aesthetic</p></li><li><p><strong>Hand-poured craftsmanship</strong> for a smooth, refined finish</p></li><li><p><strong>Slow &amp; even burn</strong> for long-lasting use</p></li><li><p><strong>Versatile décor piece</strong>—ideal for living rooms, bedrooms, and workspaces</p></li><li><p><strong>Premium wax blend</strong> ensuring a clean burn</p></li><li><p><strong>Gift-worthy design</strong> suitable for any occasion</p></li></ul><p></p>	ad314150-7dbb-4e47-a4aa-6f9a31fa3876	2026-01-05 13:10:19.147049	2026-01-05 13:10:19.147057
492fe20d-555b-4544-95ab-1dc5d0b79beb	Tall Classic Pillar Candle	<p>The <strong>Tall Classic Pillar Candle</strong> is a timeless statement of elegance and simplicity. With its clean lines and elongated form, this candle brings a sense of calm sophistication to any space. Designed to complement both modern and traditional interiors, it works beautifully as a standalone décor piece or as part of a styled candle arrangement.</p><p>Crafted with a high-quality wax blend, this pillar candle offers a slow, steady burn, making it ideal for long evenings, special occasions, or everyday ambiance. Its tall silhouette creates a warm, gentle glow that enhances the mood of living rooms, dining areas, bedrooms, and meditation corners. Whether placed on a table, console, or shelf, it adds a refined touch without overpowering the décor.</p><p>Perfect for festive styling, romantic settings, or minimalist home accents, the <strong>Tall Classic Pillar Candle</strong> is as functional as it is beautiful. It also makes a thoughtful gift for housewarmings, celebrations, or anyone who appreciates classic design and subtle luxury.</p>	<ul><li><p><strong>Tall, elegant pillar design</strong> with a classic aesthetic</p></li><li><p><strong>Premium-quality wax blend</strong> for a clean and even burn</p></li><li><p><strong>Long-lasting burn time</strong>, ideal for extended use</p></li><li><p><strong>Soft, ambient glow</strong> that enhances any room</p></li><li><p><strong>Versatile décor piece</strong> suitable for modern and traditional interiors</p></li><li><p><strong>Perfect for gifting</strong>, festivals, and special occasions</p></li></ul><p></p>	d2c1ad66-56c5-400e-b4fe-f215f75ed9a9	2026-01-05 13:25:02.741906	2026-01-05 13:25:02.742023
f217d402-07f9-487c-8076-f3c5c8352901	Grand Ember 3-Wicked Jar Candle	<p>The <strong>Grand Ember 3-Wicked Candle</strong> is crafted to make a bold statement—both in design and atmosphere. With three evenly spaced wicks, this candle delivers a wider, brighter glow that instantly transforms your space into a warm, inviting sanctuary. Its commanding presence makes it the perfect centerpiece for living rooms, dining tables, or special occasions where ambiance matters.</p><p>Designed for those who love depth and intensity, the triple-wick format ensures an even melt pool and a powerful yet balanced fragrance throw. As the flames dance together, they create a mesmerizing visual experience, filling the room with comforting warmth and a sense of calm luxury. Whether you’re hosting guests, unwinding after a long day, or setting the mood for a quiet evening, <strong>Grand Ember</strong> elevates the moment effortlessly.</p><p>Made with a premium wax blend and carefully selected wicks, this candle offers a clean, steady burn with minimal soot. Its grand scale and refined finish make it as much a décor statement as it is a sensory experience. Thoughtfully designed and beautifully presented, it also makes an exceptional gift for celebrations, housewarmings, and festive seasons.</p>	<ul><li><p><strong>Three-wick design</strong> for a wider, brighter, and more even burn</p></li><li><p><strong>Enhanced fragrance throw</strong> that fills larger spaces effortlessly</p></li><li><p><strong>Premium wax blend</strong> for a clean, consistent burn</p></li><li><p><strong>Long-lasting burn time</strong> despite its powerful performance</p></li><li><p><strong>Bold, elegant presence</strong> ideal as a centerpiece décor piece</p></li><li><p><strong>Perfect for gifting</strong>, special occasions, and luxury home styling</p></li></ul><p></p>	122acd5e-6e4c-44b4-8e00-19a416ec17ec	2026-01-05 13:39:59.180037	2026-01-05 13:39:59.180047
34f1458b-d484-4eb6-b7aa-28289ba0446c	Ribbed Vertical Form Candle	<p>The <strong>Ribbed Vertical Form Candle</strong> is designed for those who appreciate structure, balance, and modern elegance. Featuring clean vertical ridges and a tall, streamlined silhouette, this candle adds subtle texture and architectural depth to your décor. Its sculpted form makes it a sophisticated accent piece that complements contemporary, minimal, and modern interiors effortlessly.</p><p>Expertly crafted with a premium wax blend, this candle delivers a slow, even burn while maintaining its defined ribbed structure. When lit, the soft flame highlights the vertical grooves, creating gentle shadows and a warm, calming glow. Whether placed on a dining table, console, shelf, or bedside, it enhances the space with quiet luxury and refined simplicity.</p><p>Perfect for everyday styling or special occasions, the <strong>Ribbed Vertical Form Candle</strong> works beautifully on its own or paired with other sculptural candles for a curated look. Its elegant design and quality finish also make it an ideal gift for housewarmings, festive celebrations, or anyone who values timeless, design-forward home accents.</p>	<ul><li><p><strong>Vertical ribbed design</strong> with a clean, architectural aesthetic</p></li><li><p><strong>Tall, elegant silhouette</strong> for modern home styling</p></li><li><p><strong>Premium wax blend</strong> for a clean, consistent burn</p></li><li><p><strong>Slow-burning performance</strong> that preserves the sculpted form</p></li><li><p><strong>Soft ambient glow</strong> that enhances texture and depth</p></li><li><p><strong>Ideal for gifting</strong> and curated décor arrangements</p></li></ul><p><em>A modern classic that brings texture, warmth, and understated sophistication to your space.</em></p>	ad314150-7dbb-4e47-a4aa-6f9a31fa3876	2026-01-05 13:45:50.198858	2026-01-05 13:53:16.806249
fe6d07e9-3907-4df8-a8de-fa78e0fd8c6a	Large Sculpted Pillar Candle	<p>The <strong>Large Sculpted Pillar Candle</strong> is a bold expression of modern craftsmanship and timeless elegance. Designed with a substantial form and refined sculpted detailing, this candle serves as a striking décor statement while offering a warm, calming glow. Its larger size and artistic structure make it ideal for anchoring a space—whether placed on a coffee table, console, dining setting, or floor-level décor arrangement.</p><p>Hand-poured using a premium-quality wax blend, this pillar candle is created to burn slowly and evenly, allowing you to enjoy extended hours of ambiance. When lit, the flame gently enhances the sculpted contours, adding depth, shadow, and visual warmth to the surroundings. Even when unlit, its architectural presence elevates the aesthetic of both modern and classic interiors.</p><p>Perfect for intentional home styling, festive décor, or special moments, the <strong>Large Sculpted Pillar Candle</strong> blends function with artistry. Its grand scale and elegant finish make it a thoughtful gift for housewarmings, celebrations, or anyone who appreciates statement décor pieces with a refined, minimal appeal.</p><h4></h4><p></p>	<ul><li><p><strong>Large sculpted pillar design</strong> with an artistic, statement look</p></li><li><p><strong>Premium wax blend</strong> for a clean, smooth, and even burn</p></li><li><p><strong>Long-lasting burn time</strong>, ideal for extended ambiance</p></li><li><p><strong>Soft, warm glow</strong> that highlights sculptural details</p></li><li><p><strong>Strong décor presence</strong> suitable for modern and classic spaces</p></li><li><p><strong>Gift-worthy statement piece</strong> for special occasions</p></li></ul><p><em>A sculptural centerpiece that brings warmth, depth, and timeless sophistication into your home.</em></p>	d2c1ad66-56c5-400e-b4fe-f215f75ed9a9	2026-01-05 14:00:08.829415	2026-01-05 14:00:20.540299
b3d78d7a-ddd3-4473-97df-697d3c5331e1	Statement Tall Pillar Candle	<p>The <strong>Statement Tall Pillar Candle</strong> is designed to stand out with quiet confidence. Featuring a tall, commanding silhouette and a clean, refined finish, this candle brings instant elegance and visual impact to any space. Its elongated form makes it a perfect statement piece—ideal for styling in corners, on consoles, dining tables, or as part of a curated décor arrangement.</p><p>Crafted using a premium wax blend, this pillar candle delivers a slow, even burn that ensures long-lasting performance without compromising its sleek structure. When lit, the soft flame casts a warm, ambient glow that enhances the candle’s height and form, creating a calm yet dramatic atmosphere. Even when unlit, it serves as a sculptural décor element that elevates modern, minimal, and classic interiors alike.</p><p>Whether used for everyday styling, special gatherings, or festive occasions, the <strong>Statement Tall Pillar Candle</strong> adds a sense of refined luxury to your home. Its bold proportions and timeless design also make it an exceptional gift for housewarmings, celebrations, or anyone who appreciates statement décor with a minimalist aesthetic.</p>	<ul><li><p><strong>Tall, statement-making pillar design</strong> with a sleek silhouette</p></li><li><p><strong>Premium-quality wax blend</strong> for a clean and consistent burn</p></li><li><p><strong>Long-lasting burn time</strong> ideal for extended ambiance</p></li><li><p><strong>Soft, warm glow</strong> that enhances height and presence</p></li><li><p><strong>Versatile décor accent</strong> for modern and classic interiors</p></li><li><p><strong>Perfect for gifting</strong> and elevated home styling</p></li></ul><p><em>A bold yet elegant pillar candle that transforms any space into a refined, glowing statement.</em></p>	d2c1ad66-56c5-400e-b4fe-f215f75ed9a9	2026-01-05 14:04:25.561804	2026-01-05 14:04:25.561817
2520fb28-b50a-41a5-82a7-bb8da10c5220	Large Bubble Cube Candle	<p>The <strong>Large Bubble Cube Candle</strong> is a playful yet sophisticated take on modern candle design. Its unique cube shape adorned with rounded bubble details makes it an instant conversation piece, adding both texture and dimension to any space. Perfect for contemporary, minimalist, and artistic interiors, this candle transforms ordinary décor into a statement of creativity and style.</p><p>Crafted with a premium wax blend, the <strong>Large Bubble Cube Candle</strong> offers a slow, even burn, allowing you to enjoy extended hours of soft, ambient light. The bubble design creates subtle shadows and highlights as the flame dances, enhancing its sculptural charm and giving your space a warm, inviting glow. Whether displayed individually or as part of a curated arrangement, this candle brings personality, elegance, and modern artistry to your home.</p><p>Ideal for gifting or personal indulgence, its distinctive form makes it perfect for festive décor, special occasions, or as a signature piece in your living space. The <strong>Large Bubble Cube Candle</strong> proves that functionality and artistic expression can beautifully coexist.</p>	<ul><li><p><strong>Unique bubble cube design</strong> for a playful yet elegant sculptural look</p></li><li><p><strong>Large size</strong> creates a strong décor presence</p></li><li><p><strong>Premium wax blend</strong> for a clean and even burn</p></li><li><p><strong>Slow-burning</strong> for extended ambiance</p></li><li><p><strong>Soft, warm glow</strong> that accentuates the bubble details</p></li><li><p><strong>Perfect for gifting</strong> or as a signature décor piece</p></li></ul><p><em>A modern, artistic candle that brings texture, warmth, and a touch of whimsy to your home.</em></p>	ad314150-7dbb-4e47-a4aa-6f9a31fa3876	2026-01-05 14:09:00.846512	2026-01-05 14:09:00.846523
df2b1eac-0941-4519-9b49-456f03b5c749	Rounded Cube Sculpt Candle	<p>The <strong>Rounded Cube Sculpt Candle</strong> blends geometric precision with soft, organic curves, creating a modern sculptural piece that doubles as both décor and ambient lighting. Its rounded cube form adds a playful yet refined character, making it perfect for contemporary, minimalist, and artistic interiors. This candle is designed to stand out—whether displayed individually or paired with other sculptural candles for a curated tabletop or shelf arrangement.</p><p>Hand-poured with a premium wax blend, the <strong>Rounded Cube Sculpt Candle</strong> offers a slow, even burn that preserves its unique sculptural shape. As the flame dances, it casts a soft, warm glow that highlights the gentle curves and edges of the design, creating a soothing and visually captivating atmosphere. Its tactile form invites admiration even when unlit, making it as much a decorative object as a functional candle.</p><p>Perfect for gifting, special occasions, or elevating everyday spaces, the <strong>Rounded Cube Sculpt Candle</strong> is a statement of modern artistry and thoughtful design.</p>	<ul><li><p><strong>Rounded cube sculpted design</strong> combining geometric structure with soft curves</p></li><li><p><strong>Premium wax blend</strong> for a clean, consistent burn</p></li><li><p><strong>Slow-burning performance</strong> that preserves sculptural integrity</p></li><li><p><strong>Soft, ambient glow</strong> enhancing form and texture</p></li><li><p><strong>Versatile décor accent</strong> suitable for modern, minimalist, and artistic interiors</p></li><li><p><strong>Gift-worthy design</strong> ideal for celebrations and home styling</p></li></ul><p><em>A modern sculptural candle that brings warmth, texture, and elegance to any space.</em></p>	ad314150-7dbb-4e47-a4aa-6f9a31fa3876	2026-01-05 14:12:28.530131	2026-01-05 14:12:28.53014
970448f4-c37d-4cc8-b46f-07bf96ecf722	Jasmine Dusk jar candle	<p>Embrace the serene beauty of twilight with the <strong>Jasmine Dusk Jar Candle</strong>. Housed in a sleek glass jar, this candle fills your space with the delicate, soothing aroma of jasmine, perfectly balanced with soft evening notes that evoke calm, relaxation, and quiet sophistication. Its warm glow and inviting fragrance make it ideal for winding down after a long day, setting a romantic ambiance, or creating a peaceful atmosphere for meditation and self-care rituals.</p><p>Crafted with a premium wax blend and carefully selected wick, the <strong>Jasmine Dusk Jar Candle</strong> ensures a clean, even burn while releasing its luxurious fragrance consistently. The elegant jar design makes it both a functional candle and a stylish décor accent, complementing modern, minimalist, and classic interiors alike. Its soft scent profile makes it a versatile choice for any room—living spaces, bedrooms, or cozy corners—and an exceptional gift for anyone who cherishes calming aromas and thoughtful design.</p>	<ul><li><p><strong>Captivating jasmine scent</strong> blended with soft evening notes</p></li><li><p><strong>Premium wax blend</strong> for a clean, even burn</p></li><li><p><strong>Long-lasting fragrance release</strong> for hours of ambiance</p></li><li><p><strong>Elegant jar design</strong> suitable for décor accents and tabletop styling</p></li><li><p><strong>Perfect for relaxation, meditation, or romantic settings</strong></p></li><li><p><strong>Gift-worthy packaging</strong> ideal for celebrations and special occasions</p></li></ul><p><em>Turn your home into a serene evening retreat with the soft glow and enchanting aroma of Jasmine Dusk.</em></p>	122acd5e-6e4c-44b4-8e00-19a416ec17ec	2026-01-05 14:26:59.460642	2026-01-05 14:26:59.460652
0f142b6b-ac32-454c-801a-c0ca3d78d1ad	Mogra Nights Jar candle	<p>Immerse yourself in the intoxicating aroma of night-blooming mogra with the <strong>Mogra Nights Jar Candle</strong>. Encased in a stylish glass jar, this candle releases a delicate, floral fragrance that evokes the serenity and romance of warm, moonlit nights. Its soft, lingering scent creates a calming and soothing ambiance, perfect for unwinding after a long day, enjoying quiet evenings, or adding a touch of elegance to any space.</p><p>Hand-poured with a premium wax blend and crafted with care, the <strong>Mogra Nights Jar Candle</strong> ensures a clean, even burn that allows the enchanting fragrance to fill your room for hours. Its elegant jar design complements any décor style—from modern and minimalist to classic and cozy—making it as much a décor accent as it is a sensory delight. Perfect for gifting or personal indulgence, it transforms ordinary moments into serene, fragrant experiences.</p>	<ul><li><p><strong>Delicate mogra fragrance</strong> reminiscent of calm, moonlit nights</p></li><li><p><strong>Premium wax blend</strong> for a clean, steady burn</p></li><li><p><strong>Long-lasting fragrance release</strong> to fill your space with soothing aroma</p></li><li><p><strong>Elegant glass jar design</strong> perfect for décor and tabletop styling</p></li><li><p><strong>Ideal for relaxation, meditation, or cozy evenings</strong></p></li><li><p><strong>Gift-worthy candle</strong> for celebrations, housewarmings, or special occasions</p></li></ul><p><em>Let the soft floral aroma of Mogra Nights create an enchanting and peaceful retreat in your home.</em></p>	122acd5e-6e4c-44b4-8e00-19a416ec17ec	2026-01-05 14:31:09.21218	2026-01-05 14:31:09.212193
8886cdfd-2a6c-4067-998d-6df2ddabc3b9	Beautiful Rose Shape Candle	<p>The <strong>Beautiful Rose Shape Candle</strong> is a stunning fusion of artistry and elegance, designed to capture the delicate beauty of a blooming rose in full detail. Each petal is intricately sculpted, creating a candle that is as visually captivating as it is functional. Perfect for romantic settings, festive décor, or as a centerpiece, this candle brings sophistication and charm to any space.</p><p>Crafted with a premium wax blend, the <strong>Beautiful Rose Shape Candle</strong> burns evenly, releasing a gentle glow that enhances the intricate floral design. Its sculptural form makes it an exquisite décor accent, whether displayed on a dining table, mantelpiece, bedside table, or gift tray. Beyond its aesthetic appeal, it provides a warm, soothing ambiance that elevates special moments or everyday experiences.</p><p>Ideal as a thoughtful gift for loved ones or as a decorative statement in your own home, this rose-shaped candle combines timeless beauty, craftsmanship, and functionality in one elegant package.</p>	<ul><li><p><strong>Intricately sculpted rose design</strong> for a realistic, elegant look</p></li><li><p><strong>Premium wax blend</strong> ensures a clean, even burn</p></li><li><p><strong>Soft, ambient glow</strong> that highlights the detailed petals</p></li><li><p><strong>Perfect as a centerpiece or décor accent</strong> in any room</p></li><li><p><strong>Ideal for gifting</strong>, romantic occasions, or festive celebrations</p></li><li><p><strong>Handcrafted elegance</strong> for a luxurious touch</p></li></ul><p><em>Experience the beauty and warmth of a blooming rose that lasts, even when the flame is gone.</em></p>	ad314150-7dbb-4e47-a4aa-6f9a31fa3876	2026-01-05 14:46:38.768553	2026-01-05 14:46:38.768783
83d672be-097e-4c84-9a7c-eb3c20a8b7ca	Mini Teddy Bear Candle	<p>Bring a touch of whimsy and charm to your space with the <strong>Mini Teddy Bear Candle</strong>. Crafted with adorable detailing, this miniature candle resembles a cuddly teddy bear, making it a delightful décor piece that appeals to both children and adults alike. Perfect for nurseries, bedside tables, or as a cute gift, it adds warmth, personality, and a playful accent to any room.</p><p>Made with a premium wax blend and carefully designed wick, the <strong>Mini Teddy Bear Candle</strong> ensures a slow, clean burn that preserves the intricate shape. Even unlit, its sculptural design makes it a conversation starter and a lovely decorative addition to shelves, desks, or gift trays.</p><p>Whether used for gifting, festive décor, or simply to bring joy to everyday spaces, the <strong>Mini Teddy Bear Candle</strong> is a charming balance of craftsmanship, function, and delight.</p>	<ul><li><p><strong>Adorable teddy bear shape</strong> with intricate detailing</p></li><li><p><strong>Premium wax blend</strong> for a clean, even burn</p></li><li><p><strong>Small size, perfect for décor accents</strong> or gift sets</p></li><li><p><strong>Soft, ambient glow</strong> when lit, preserving the sculptural charm</p></li><li><p><strong>Ideal for gifting</strong>, children’s rooms, or playful décor</p></li><li><p><strong>Handcrafted design</strong> for a unique, collectible feel</p></li></ul><p><em>Add a touch of cuteness and warmth to your home with this charming miniature candle.</em></p>	d93fc29e-2624-466c-a5c7-d0ca83751b2d	2026-01-05 14:52:21.580717	2026-01-05 14:52:21.581303
07d31de1-de43-43bd-88cf-d4cfe9c72aed	Mini Laddo Candle	<p>The <strong>Mini Laddo Candle</strong> brings a delightful touch of charm and tradition to your home décor. Shaped like a petite laddo, this miniature candle combines cultural inspiration with handcrafted artistry, making it a whimsical yet elegant accent for any space. Its compact size and unique design make it perfect for decorating shelves, tables, or as part of festive arrangements.</p><p>Hand-poured using a premium wax blend, the <strong>Mini Laddo Candle</strong> ensures a clean, even burn while preserving its intricate shape. When lit, it emits a soft, ambient glow that enhances its sculptural charm, creating a cozy and inviting atmosphere. Even unlit, its unique design serves as a conversation starter and a collectible décor piece.</p><p>Perfect for gifting, festive décor, or adding a touch of playful elegance to your home, the <strong>Mini Laddo Candle</strong> captures the essence of tradition and craftsmanship in a charming, miniature form.</p>	<ul><li><p><strong>Mini laddo-inspired design</strong> for playful, cultural elegance</p></li><li><p><strong>Premium wax blend</strong> ensures a clean and steady burn</p></li><li><p><strong>Compact size</strong> perfect for shelves, tables, or gift sets</p></li><li><p><strong>Soft, ambient glow</strong> that enhances the sculptural detail</p></li><li><p><strong>Ideal for gifting</strong>, festive décor, or collectible displays</p></li><li><p><strong>Handcrafted artistry</strong> for a unique, charming touch</p></li></ul><p><em>Celebrate warmth, tradition, and artistry with the Mini Laddo Candle—a small candle with big charm.</em></p>	d93fc29e-2624-466c-a5c7-d0ca83751b2d	2026-01-05 14:54:55.289213	2026-01-05 14:54:55.28923
49e0e569-f2d8-4e7a-9485-5d3aba589c14	Mini Rainbow Candle	<p>Add a pop of color and joy to your space with the <strong>Mini Rainbow Candle</strong>. Crafted in a charming, miniature rainbow shape, this candle brings playful elegance and a sense of whimsy to any décor. Perfect for shelves, desks, or tabletop arrangements, it instantly brightens rooms with its vibrant layers and cheerful presence.</p><p>Made with a premium wax blend and a carefully designed wick, the <strong>Mini Rainbow Candle</strong> burns evenly while maintaining its colorful, sculptural form. When lit, it creates a soft, ambient glow that complements its vivid hues, enhancing both mood and visual appeal. Even unlit, it serves as a delightful decorative accent that sparks joy and conversation.</p><p>Ideal for gifting, festive décor, or personal indulgence, the <strong>Mini Rainbow Candle</strong> is a miniature masterpiece that combines artistry, color, and functionality in one compact design.</p>	<ul><li><p><strong>Mini rainbow shape</strong> with vibrant, playful colors</p></li><li><p><strong>Premium wax blend</strong> for a clean, even burn</p></li><li><p><strong>Compact size</strong> perfect for shelves, desks, or tabletop décor</p></li><li><p><strong>Soft, warm glow</strong> when lit enhances its sculptural form</p></li><li><p><strong>Ideal for gifting</strong>, celebrations, or whimsical décor</p></li><li><p><strong>Handcrafted design</strong> for a unique, collectible feel</p></li></ul><p><em>Bring color, charm, and a touch of magic into your home with the Mini Rainbow Candle.</em></p>	d93fc29e-2624-466c-a5c7-d0ca83751b2d	2026-01-05 14:57:54.459347	2026-01-05 14:57:54.459371
2a8ef4c3-8efe-4513-b49d-5017b4d31420	Mini Modak Candle	<p>Celebrate tradition and charm with the <strong>Mini Modak Candle</strong>, inspired by the iconic Indian sweet. Its miniature, intricately crafted form captures the essence of festive joy and cultural elegance, making it a delightful accent for any décor. Perfect for Diwali, festive arrangements, or as a charming tabletop display, this candle brings warmth, celebration, and playful sophistication to your home.</p><p>Hand-poured using a premium wax blend, the <strong>Mini Modak Candle</strong> ensures a clean, even burn while preserving its delicate, sculpted form. When lit, it emits a soft, ambient glow that enhances its intricate details, creating a cozy and festive atmosphere. Even unlit, it serves as a decorative collectible that adds personality and charm to shelves, gift trays, or festive décor setups.</p><p>Ideal for gifting, festival celebrations, or personal indulgence, the <strong>Mini Modak Candle</strong> is a small candle with a big festive heart.</p>	<ul><li><p><strong>Mini modak-inspired design</strong> capturing festive tradition and charm</p></li><li><p><strong>Premium wax blend</strong> for a clean and steady burn</p></li><li><p><strong>Compact size</strong> perfect for décor, gift sets, or festive arrangements</p></li><li><p><strong>Soft, ambient glow</strong> enhances sculptural detail and festive appeal</p></li><li><p><strong>Ideal for gifting</strong> during Diwali, celebrations, or housewarmings</p></li><li><p><strong>Handcrafted artistry</strong> for a unique and collectible decorative piece</p></li></ul><p><em>Bring the warmth and joy of festive celebrations into your home with the Mini Modak Candle.</em></p>	d93fc29e-2624-466c-a5c7-d0ca83751b2d	2026-01-05 15:02:20.283139	2026-01-05 15:02:20.283175
2cf3a8ed-53d9-4f6d-9c27-5ca346261b43	Mini jar candle	<p>The <strong>Mini Jar Candle</strong> is a charming little accent that brings warmth and elegance to any space. Housed in a sleek, compact glass jar, it’s perfect for creating cozy ambiance on shelves, desks, bedside tables, or as part of a curated décor arrangement. Despite its small size, this candle offers a delightful glow and a sense of sophistication that complements modern, minimal, and classic interiors alike.</p><p>Hand-poured with a premium wax blend and carefully designed wick, the <strong>Mini Jar Candle</strong> burns evenly and cleanly, releasing a subtle, inviting fragrance that enhances the atmosphere of any room. Its versatile design makes it ideal for gifting, festive décor, or personal indulgence.</p>	<ul><li><p><strong>Compact glass jar design</strong> for versatile décor styling</p></li><li><p><strong>Premium wax blend</strong> for a clean, steady burn</p></li><li><p><strong>Soft, warm glow</strong> perfect for intimate spaces</p></li><li><p><strong>Ideal for gifting</strong>, tabletop décor, or cozy corners</p></li><li><p><strong>Handcrafted quality</strong> for a unique, thoughtful touch</p></li><li><p><strong>Perfect for modern, minimal, or classic interiors</strong></p></li></ul><p><em>Add a touch of elegance and warmth to any space with the Mini Jar Candle—a small candle with a big impact.</em></p>	d93fc29e-2624-466c-a5c7-d0ca83751b2d	2026-01-05 15:06:06.048749	2026-01-05 15:06:06.049195
fcc42ad1-9a1c-45cf-a50e-547d9e86e451	Wick Trimmer	<p>Maintain the perfect burn and extend the life of your candles with our <strong>premium Wick Trimmers</strong>. Designed for precision and ease, these trimmers ensure your candle wicks are always at the ideal length, promoting a clean, even burn while reducing soot and smoke. A small yet essential tool, they help you get the most out of every candle, keeping your home ambiance beautiful and your candles performing at their best.</p><p>Crafted from high-quality materials, our <strong>Wick Trimmers</strong> feature a sleek design that is both functional and stylish. The long handle provides safe, easy access to deep or tall candles, while the sharp, angled blades make trimming quick and effortless. Perfect for all types of candles—including jar, pillar, and sculptural candles—these trimmers are a must-have for candle enthusiasts and gift sets alike.</p>	<ul><li><p><strong>Precision trimming</strong> for optimal wick length and clean burns</p></li><li><p><strong>Reduces soot and smoke</strong>, enhancing candle longevity</p></li><li><p><strong>Long handle design</strong> for safe and easy use with all candle types</p></li><li><p><strong>Sharp, angled blades</strong> for effortless trimming</p></li><li><p><strong>Durable, premium-quality material</strong> for long-lasting use</p></li><li><p><strong>Perfect for gifting</strong> or as an essential candle accessory</p></li></ul><p><em>Keep your candles burning beautifully and safely with our elegant and functional Wick Trimmers.</em></p>	562ad7de-08b8-4b88-b16a-aaa8324a4e29	2026-01-05 15:18:45.596996	2026-01-05 15:19:56.30178
717e1e09-9f0a-4f47-b717-5e04b5c53c5b	Wax Melt – Round	<p>Transform your home into a fragrant haven with our <strong>Round Wax Melts</strong>. Crafted for a clean, long-lasting fragrance experience, these melts release rich and inviting aromas when gently warmed in a wax burner. Their classic round shape makes them easy to handle, perfect for layering multiple scents, or enjoying individually for a subtle fragrance boost.</p><p>Made with a premium wax blend and infused with carefully selected fragrance oils, the <strong>Round Wax Melt</strong> melts evenly, releasing consistent fragrance without smoke or soot. Ideal for living rooms, bedrooms, bathrooms, or office spaces, they provide a versatile and mess-free way to fill your space with your favorite scents.</p>	<ul><li><p><strong>Round shape</strong> for easy handling and even melting</p></li><li><p><strong>Premium wax blend</strong> infused with long-lasting fragrance oils</p></li><li><p><strong>Clean, soot-free burn</strong> when used in a wax warmer</p></li><li><p><strong>Versatile usage</strong> for any room or occasion</p></li><li><p><strong>Perfect for layering scents</strong> or enjoying individually</p></li><li><p><strong>Ideal for gifting</strong> or creating a fragrant, cozy ambiance</p></li></ul><p></p>	998aa8d3-6a23-428d-b01b-499beac3e3b9	2026-01-05 15:22:29.66337	2026-01-05 15:22:29.663425
cd3d6d00-43d8-4ae4-bb63-3576d635ec88	Wax Melt – Cube	<p>Elevate your home fragrance experience with our <strong>Cube Wax Melts</strong>. Designed for a clean, long-lasting scent release, these cube-shaped melts are perfect for use in wax warmers, allowing you to enjoy rich, inviting aromas without the need for a flame. Their compact shape makes them easy to handle, ideal for layering multiple scents or using individually for a subtle, controlled fragrance.</p><p>Crafted from a premium wax blend and infused with high-quality fragrance oils, the <strong>Cube Wax Melt</strong> melts evenly, filling your space with consistent, soothing fragrance. Perfect for bedrooms, living areas, bathrooms, or workspaces, these wax melts offer a versatile and mess-free way to enhance any environment with your favorite aromas.</p>	<ul><li><p><strong>Cube shape</strong> for precise handling and even melting</p></li><li><p><strong>Premium wax blend</strong> infused with long-lasting fragrance oils</p></li><li><p><strong>Clean, soot-free aroma</strong> when used in a wax warmer</p></li><li><p><strong>Versatile and mess-free</strong> for any room or occasion</p></li><li><p><strong>Perfect for layering scents</strong> or enjoying individually</p></li><li><p><strong>Ideal for gifting</strong> or creating a cozy, fragrant atmosphere</p></li></ul><p></p><p><em>Compact, convenient, and full of fragrance—our Cube Wax Melts make every space feel inviting.</em></p>	998aa8d3-6a23-428d-b01b-499beac3e3b9	2026-01-05 15:27:29.89868	2026-01-05 15:27:29.899812
81ea368d-fc28-4cda-90ee-171a19fb5b4f	Scented Jar Candle Set of 4 | Jasmine, Lavender, Cinnamon Vanilla, Sandal	<p>Create a warm, festive, and inviting atmosphere with our <strong>Fragrance Jar Candle Set of 4</strong>, thoughtfully curated to elevate your home décor and celebrations. This elegant candle set features four timeless fragrances—<strong>Jasmine, French Lavender, Cinnamon Vanilla, and Ivory Sandal</strong>—each designed to bring comfort, calm, and luxury into your living space.</p><p>Housed in sleek glass jars, these scented candles are perfect for enhancing everyday ambiance as well as special occasions like <strong>Diwali, housewarmings, festive gatherings, and gifting</strong>. From the soothing floral notes of jasmine and lavender to the cozy warmth of cinnamon vanilla and the grounding richness of sandalwood, this set offers a balanced fragrance journey for every mood and moment.</p><p>Crafted with a premium wax blend and carefully selected wicks, each candle delivers a clean, even burn with a long-lasting fragrance throw. Whether styled together as a décor set or placed individually across rooms, this candle collection adds elegance, warmth, and sensory comfort to your home.</p><h4><strong>Fragrances Included</strong></h4><ul><li><p><strong>Jasmine</strong> – Soft, floral, and calming</p></li><li><p><strong>French Lavender</strong> – Relaxing and soothing</p></li><li><p><strong>Cinnamon Vanilla</strong> – Warm, cozy, and comforting</p></li><li><p><strong>Ivory Sandal</strong> – Rich, woody, and grounding</p></li></ul><p></p>	<ul><li><p><strong>Set of 4 premium scented jar candles</strong></p></li><li><p><strong>Elegant glass jar design</strong> for stylish home décor</p></li><li><p><strong>Long-lasting fragrance</strong> with clean, even burn</p></li><li><p><strong>Premium wax blend</strong> for minimal soot and smoke</p></li><li><p><strong>Perfect for Diwali décor, gifting, and celebrations</strong></p></li><li><p><strong>Ideal for living rooms, bedrooms, and festive settings</strong></p></li><li><p><strong>Lavender, Cinnamon Vanilla, Jasmine, Ivory Sandal Fragrance</strong></p></li></ul><p><em>A beautifully curated fragrance set that brings warmth, calm, and festive elegance into every corner of your home.</em><br><br></p>	741c5460-bd48-46a6-a444-b824090955fa	2026-01-05 15:48:51.891129	2026-01-05 15:50:48.209285
9d38126d-1030-45dd-b009-2f76f48095b5	Small Scented Candle Gift Set of 6 | Reusable Jars | Lavender, Rose, Vanilla, Jasmine	<p>Elevate your home ambiance and gifting experience with the <strong>Floryn Decor Small Scented Candle Gift Set</strong>, a beautifully curated collection of six mini scented candles designed to delight the senses. Each candle comes in an elegant, reusable glass jar, making this set a perfect blend of fragrance, functionality, and thoughtful décor.</p><p>Perfect for <strong>Diwali gifting, housewarmings, birthdays, weddings, or self-care moments</strong>, the <strong>Floryn Decor Candle Gift Set</strong> is a thoughtful way to share warmth, fragrance, and style.<br><br><strong>Fragrances Included</strong></p><ul><li><p><strong>Lavender</strong> – Calm and relaxing</p></li><li><p><strong>Rose</strong> – Soft, romantic floral</p></li><li><p><strong>Vanilla</strong> – Warm and comforting</p></li><li><p><strong>Jasmine</strong> – Fresh, soothing floral</p></li><li><p><strong>Sandalwood</strong> – Rich, woody, and grounding</p></li><li><p><strong>Lemongrass</strong> – Fresh, uplifting, and energizing</p></li></ul><p></p>	<ul><li><p><strong>Set of 6 small scented candles</strong></p></li><li><p><strong>Reusable glass jars</strong> for sustainable décor and storage</p></li><li><p><strong>Premium wax blend</strong> for a clean, even burn</p></li><li><p><strong>Long-lasting fragrance</strong> suitable for any room</p></li><li><p><strong>Perfect for gifting</strong> and festive occasions</p></li><li><p><strong>Compact size</strong> ideal for décor, travel, or return gifts</p></li></ul><p><em>A charming candle set that blends fragrance, elegance, and sustainability—perfect for gifting or personal indulgence.</em></p>	741c5460-bd48-46a6-a444-b824090955fa	2026-01-05 15:57:21.013675	2026-01-05 15:57:21.013906
7770c8b7-8e6f-4668-9585-cdd30d7219fd	Beeswax Pillar Candles	<p>Experience the timeless beauty of nature with our <strong>Beeswax Pillar Candles</strong>, crafted for those who appreciate purity, warmth, and understated luxury. Made from high-quality beeswax, these pillar candles offer a naturally rich tone and a gentle, honey-like aroma that enhances any space without overpowering it. Their classic pillar shape makes them perfect for both everyday décor and special occasions.</p><p>Beeswax is known for its clean, slow-burning properties, and these candles are designed to burn evenly with minimal smoke or dripping. As they burn, they emit a warm, golden glow that creates a calming and cozy ambiance—ideal for living rooms, bedrooms, meditation spaces, dining tables, or festive décor. Even when unlit, their natural texture and elegant form add a refined, organic touch to your home.</p><p>Durable and long-lasting, <strong>Beeswax Pillar Candles</strong> are a sustainable and thoughtful choice for those seeking natural alternatives. They also make meaningful gifts for housewarmings, celebrations, or anyone who values eco-friendly, handcrafted home essentials.</p>	<ul><li><p><strong>Made from high-quality beeswax</strong> for a natural, premium finish</p></li><li><p><strong>Clean and slow burn</strong> with minimal smoke and dripping</p></li><li><p><strong>Naturally subtle honey aroma</strong>—no added fragrance</p></li><li><p><strong>Warm, golden glow</strong> for a calming ambiance</p></li><li><p><strong>Classic pillar design</strong> suitable for décor and occasions</p></li><li><p><strong>Eco-friendly and long-lasting</strong> candle option</p></li></ul><p><em>A natural classic that brings warmth, purity, and timeless elegance into your home.</em></p>	fa0c8e4d-93e1-4fcd-93b1-45ccc3b465fb	2026-01-05 16:08:35.531068	2026-01-05 16:08:35.531694
9e6decec-adb2-4fb5-bc20-31b4400d4556	Beeswax Taper Candles	<p>Bring timeless elegance and natural warmth to your space with our <strong>Beeswax Taper Candles</strong>. Crafted from high-quality beeswax, these candles feature a graceful tapered silhouette that adds sophistication to dining tables, mantels, festive arrangements, and special occasions. Their naturally rich color and subtle honey-like aroma create an inviting ambiance without the need for added fragrance.</p><p>Beeswax is prized for its clean, slow-burning qualities, and these taper candles are designed to burn evenly with minimal smoke and dripping. As they burn, they emit a soft, golden glow that enhances the atmosphere of intimate dinners, celebrations, meditation spaces, and everyday décor. Even when unlit, their elegant form and natural finish make them a refined decorative accent.</p><p>Sustainable, long-lasting, and beautifully crafted, <strong>Beeswax Taper Candles</strong> are an ideal choice for those who value natural materials and timeless design. They also make thoughtful gifts for housewarmings, weddings, festive occasions, or anyone seeking eco-friendly home décor essentials.</p>	<ul><li><p><strong>Made from premium-quality beeswax</strong> for a natural, elegant finish</p></li><li><p><strong>Clean, slow burn</strong> with minimal smoke and dripping</p></li><li><p><strong>Naturally subtle honey aroma</strong> with no added fragrance</p></li><li><p><strong>Soft, warm golden glow</strong> for refined ambiance</p></li><li><p><strong>Classic tapered design</strong> perfect for décor and special occasions</p></li><li><p><strong>Eco-friendly and long-lasting</strong> candle option</p></li></ul><p><em>A naturally elegant taper candle that brings warmth, purity, and timeless charm to every setting.</em></p>	fa0c8e4d-93e1-4fcd-93b1-45ccc3b465fb	2026-01-05 16:12:15.398216	2026-01-05 16:12:15.398808
25859f95-419a-4fe5-a352-bbcea7b66689	Coconut Luxe Glow Jar Candle	<p>Indulge in the pure, refined glow of the <strong>100% Coconut Luxe Glow Jar Candle</strong>, crafted for those who appreciate clean ingredients, elegant design, and elevated ambiance. Made with 100% natural coconut wax, this candle delivers a smooth, creamy burn and a soft, radiant glow that transforms any space into a calm, luxurious retreat.</p><p>Coconut wax is known for its clean-burning and slow-melting properties, allowing fragrance to release gently and evenly throughout the burn. Paired with a premium-quality wick and housed in a sleek, reusable glass jar, this candle offers a long-lasting, soot-free experience that enhances both mood and décor. Whether used for relaxation, self-care rituals, or refined home styling, it brings warmth and sophistication to every moment.</p><p>Designed to complement modern, minimal, and luxury interiors, the <strong>100% Coconut Luxe Glow Jar Candle</strong> is as beautiful unlit as it is when glowing. Its eco-conscious composition and elegant presentation also make it a thoughtful gift for celebrations, housewarmings, or anyone who values natural luxury.</p>	<ul><li><p><strong>Made with 100% natural coconut wax</strong> for a clean, premium burn</p></li><li><p><strong>Smooth, slow-burning performance</strong> with minimal soot</p></li><li><p><strong>Enhanced fragrance throw</strong> for a refined sensory experience</p></li><li><p><strong>Elegant reusable glass jar</strong> for décor or storage</p></li><li><p><strong>Soft, radiant glow</strong> that elevates any space</p></li><li><p><strong>Eco-friendly and luxury candle choice</strong>, perfect for gifting</p></li></ul><p><em>A pure, luminous candle crafted to glow beautifully and elevate your everyday moments.</em></p>	7713272c-d70e-4be5-8eeb-adb219fe2810	2026-01-05 16:17:41.887923	2026-01-05 16:17:41.888223
\.


--
-- Data for Name: variant_attributes; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.variant_attributes (id, name, variant_id, created_at, updated_at) FROM stdin;
215a7094-29bd-49e8-b3b1-222033762b83	Lavender	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 09:44:07.973754	2026-01-05 09:44:07.973757
f0f569b9-b6f1-4a89-817e-75a091b96d13	Vanilla	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 09:44:07.973965	2026-01-05 09:44:07.973966
3b0b69ef-ad72-460a-8512-591ecf8f9d77	Sandalwood	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 09:44:07.973983	2026-01-05 09:44:07.973983
d82ecc97-42fc-4284-abb2-e675a9d4cd62	Rose	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 09:44:07.974013	2026-01-05 09:44:07.974013
2bc441ab-fbb6-4109-a17f-31e46c17c49e	Citrus	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 09:44:07.974027	2026-01-05 09:44:07.974027
179725dc-2178-469b-8eca-01cbdc01a5e0	Unscented	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 09:44:07.974041	2026-01-05 09:44:07.974041
6bb09238-2ce0-488c-bc1b-32f2699c3dde	100gm	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 09:45:18.916916	2026-01-05 09:45:18.916918
155aef91-454b-4619-9794-9011afd0b384	200gm	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 09:45:18.917164	2026-01-05 09:45:18.917165
5f891bfc-bb21-4acc-8cf4-bc680f9315df	300gm	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 09:45:18.917196	2026-01-05 09:45:18.917197
424afb1e-22e0-4bf0-becd-559317274a2c	small	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 09:45:18.917227	2026-01-05 09:45:18.917233
609cc553-acd1-4722-b23f-f5a685b63cf8	medium	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 09:45:18.917247	2026-01-05 09:45:18.917248
9fead3bd-d256-4274-b904-b59388b0bea8	large	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 09:45:18.917272	2026-01-05 09:45:18.917273
0ed08ebc-b077-4321-ae3d-f9d6a5551fa6	Soy Wax	368a7839-d0b7-4e2f-8ea5-4411edda0510	2026-01-05 09:46:01.93275	2026-01-05 09:46:01.932753
792a3f28-b911-4595-abe3-fede10ab0e1e	Bee Wax	368a7839-d0b7-4e2f-8ea5-4411edda0510	2026-01-05 09:46:01.93281	2026-01-05 09:46:01.932811
c9da09fe-faeb-4654-9443-81217fc06787	Glass	ab43fd73-d576-429a-95b7-573f927e0a3a	2026-01-05 09:46:39.735886	2026-01-05 09:46:39.735888
34c5c4fb-6366-48b6-9526-4b6a6adc1fd8	Ceramic	ab43fd73-d576-429a-95b7-573f927e0a3a	2026-01-05 09:46:39.735934	2026-01-05 09:46:39.735935
b95be0ce-f397-4fe8-9edf-882034f9ffd3	Metal	ab43fd73-d576-429a-95b7-573f927e0a3a	2026-01-05 09:46:39.73595	2026-01-05 09:46:39.735951
377f0f47-ccc3-4331-b2a5-a40bf7c02a6e	White	4a4122de-6da6-4fae-b2b2-d4a7b08baf3e	2026-01-05 09:47:12.459242	2026-01-05 09:47:12.459243
b6e8e76e-c919-48b2-8fbf-10ce492658a1	Black	4a4122de-6da6-4fae-b2b2-d4a7b08baf3e	2026-01-05 09:47:12.459284	2026-01-05 09:47:12.459285
8fe76da1-765b-4855-a76c-2fb6f521c02f	Amber	4a4122de-6da6-4fae-b2b2-d4a7b08baf3e	2026-01-05 09:47:12.4593	2026-01-05 09:47:12.459301
ed73804f-1c4f-4ce2-869e-702cb4ca2c2f	Transparent	4a4122de-6da6-4fae-b2b2-d4a7b08baf3e	2026-01-05 09:47:12.459318	2026-01-05 09:47:12.459319
f2c50ddc-5d94-43c4-8ca7-1ed79f258a4d	Plastic	ab43fd73-d576-429a-95b7-573f927e0a3a	2026-01-05 10:23:12.342859	2026-01-05 10:23:12.3429
419e1cdb-8419-4aec-adb0-3b058a4d3991	Oil	6768a22a-3ecc-49de-8cdc-6ed13a7750db	2026-01-05 10:24:26.106725	2026-01-05 10:24:26.106727
7eca529c-fdd8-4838-b668-8400a3cde1f5	Wax Melt	6768a22a-3ecc-49de-8cdc-6ed13a7750db	2026-01-05 10:24:26.106844	2026-01-05 10:24:26.106844
03af96e4-21c8-4fbd-ade9-bd0ce9287868	Tea light	6768a22a-3ecc-49de-8cdc-6ed13a7750db	2026-01-05 10:24:26.106863	2026-01-05 10:24:26.106863
6d0c068b-0cd4-40de-aeda-9c8a53c89712	Electric	526d8cdb-c25d-4796-8daf-b896c43b1aa2	2026-01-05 10:25:06.644068	2026-01-05 10:25:06.644068
628fff98-9316-4278-a3db-cc0613ad7890	Fire	526d8cdb-c25d-4796-8daf-b896c43b1aa2	2026-01-05 10:25:06.644112	2026-01-05 10:25:06.644112
c1f17b48-12b0-4595-b066-45a39f33430e	Beige	4a4122de-6da6-4fae-b2b2-d4a7b08baf3e	2026-01-05 11:30:26.371282	2026-01-05 11:30:26.3715
6be77332-9278-4c47-b0f7-311ef8792b9f	OneSize	2f926c78-941a-4bf4-a635-129017dbbdb8	2026-01-05 13:11:19.322395	2026-01-05 13:11:19.322416
373c36d6-cb9b-4b0a-88d6-9445e1f4c70b	Mogra	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 14:25:58.986638	2026-01-05 14:25:58.986646
883eb282-b4bd-444e-80dd-2829a934992c	Coffee	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 14:25:58.990118	2026-01-05 14:25:58.990119
31e55912-22f1-4ba0-86ed-e1222f29f4a9	Jasmine	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 14:25:58.990151	2026-01-05 14:25:58.990151
b927cd2d-baaa-4929-9d5c-e6c93984646e	Mix	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 15:49:05.897592	2026-01-05 15:49:05.897631
83f663d7-5070-4f16-b43a-982d943093a5	Natural honey	12af4590-48c5-4311-9cf3-336a85aaa0b7	2026-01-05 16:09:28.00365	2026-01-05 16:09:28.003747
64d01446-110c-457e-be6b-156fcdfa59f6	Coconut Wax	368a7839-d0b7-4e2f-8ea5-4411edda0510	2026-01-05 09:46:01.932828	2026-01-05 16:18:19.357068
\.


--
-- Data for Name: variants; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.variants (id, name, category_id, created_at, updated_at) FROM stdin;
368a7839-d0b7-4e2f-8ea5-4411edda0510	Wax Type	cef3cad1-70c9-4127-a3f9-e988b164a752	2026-01-05 09:46:01.931058	2026-01-05 09:46:01.931225
ab43fd73-d576-429a-95b7-573f927e0a3a	Material	6ff88ccf-c629-4638-9642-2be3edf097a9	2026-01-05 09:46:39.734467	2026-01-05 09:46:39.734507
4a4122de-6da6-4fae-b2b2-d4a7b08baf3e	Color	6ff88ccf-c629-4638-9642-2be3edf097a9	2026-01-05 09:47:12.458512	2026-01-05 09:47:12.458554
6768a22a-3ecc-49de-8cdc-6ed13a7750db	Burner Type	7f548075-6809-447c-be88-4f27f65bc0ae	2026-01-05 10:24:26.103836	2026-01-05 10:24:26.103896
526d8cdb-c25d-4796-8daf-b896c43b1aa2	Power Source	7f548075-6809-447c-be88-4f27f65bc0ae	2026-01-05 10:25:06.642938	2026-01-05 10:25:06.642965
2f926c78-941a-4bf4-a635-129017dbbdb8	Size	eee5d497-7180-40b2-bdbd-eaa244ceaca3	2026-01-05 09:45:18.914198	2026-01-05 15:25:23.790593
12af4590-48c5-4311-9cf3-336a85aaa0b7	Fragrance	eee5d497-7180-40b2-bdbd-eaa244ceaca3	2026-01-05 09:44:07.969325	2026-01-05 15:34:06.285707
\.


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: databasechangeloglock databasechangeloglock_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);


--
-- Name: product_item_variant_attributes pk_product_item_variant; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_item_variant_attributes
    ADD CONSTRAINT pk_product_item_variant PRIMARY KEY (product_item_id, variant_attribute_id);


--
-- Name: product_item_images product_item_images_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_item_images
    ADD CONSTRAINT product_item_images_pkey PRIMARY KEY (id);


--
-- Name: product_items product_items_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT product_items_pkey PRIMARY KEY (id);


--
-- Name: product_items product_items_sku_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT product_items_sku_key UNIQUE (sku);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: variant_attributes uk_variant_attributes_name; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.variant_attributes
    ADD CONSTRAINT uk_variant_attributes_name UNIQUE (name);


--
-- Name: variants uk_variant_name; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT uk_variant_name UNIQUE (name);


--
-- Name: variant_attributes variant_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.variant_attributes
    ADD CONSTRAINT variant_attributes_pkey PRIMARY KEY (id);


--
-- Name: variants variants_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT variants_pkey PRIMARY KEY (id);


--
-- Name: categories fk_category_parent; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_category_parent FOREIGN KEY (parent_category) REFERENCES public.categories(id);


--
-- Name: product_item_variant_attributes fk_piva_product_item; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_item_variant_attributes
    ADD CONSTRAINT fk_piva_product_item FOREIGN KEY (product_item_id) REFERENCES public.product_items(id);


--
-- Name: product_item_variant_attributes fk_piva_variant_attribute; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_item_variant_attributes
    ADD CONSTRAINT fk_piva_variant_attribute FOREIGN KEY (variant_attribute_id) REFERENCES public.variant_attributes(id);


--
-- Name: products fk_product_category; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: product_item_images fk_product_item_image_item; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_item_images
    ADD CONSTRAINT fk_product_item_image_item FOREIGN KEY (product_item_id) REFERENCES public.product_items(id);


--
-- Name: product_items fk_product_item_product; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT fk_product_item_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: variant_attributes fk_variant_attribute_variant; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.variant_attributes
    ADD CONSTRAINT fk_variant_attribute_variant FOREIGN KEY (variant_id) REFERENCES public.variants(id);


--
-- Name: variants fk_variant_category; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT fk_variant_category FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Q9GFV8vXv9mX8LpwafQjjhnCsTkprIv0XJCsLo5uunA8PdRbs2uwYleBOLmvdqK

