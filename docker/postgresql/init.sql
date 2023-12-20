CREATE DATABASE nouvellesdb
  LC_COLLATE 'C'
  LC_CTYPE 'C'
  ENCODING 'UTF8'
  TEMPLATE template0;

CREATE USER nouvelles WITH ENCRYPTED PASSWORD 'nouvellespw';

-- 유저에게 데이터베이스 접근 권한 부여
GRANT ALL ON DATABASE nouvellesdb to nouvelles;
-- 유저에게 스키마 접근 권한 부여
GRANT ALL ON SCHEMA public TO nouvelles;

-- 유저에게 데이터베이스 생성 권한 부여
ALTER USER nouvelles CREATEDB;

-- 타임존 설정
ALTER DATABASE nouvellesdb SET timezone TO 'Asia/Seoul';

\c nouvellesdb
