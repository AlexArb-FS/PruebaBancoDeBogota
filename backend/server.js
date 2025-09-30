import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { env } from 'process';

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar cliente Supabase
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://tu-supabase-url.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(cors());
app.use(express.json());

// Endpoint de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password }); // Depuración
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log('Query result:', { data, error }); // Depuración
    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }
    res.json({ success: true, user: data.user });
  } catch (err) {
    console.error('Server error:', err); // Depuración
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});