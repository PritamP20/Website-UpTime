"use client"
import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function Appbar(){
    return(
        <div className='flex justify-items-center items-center p-4'>
            <div>Dpin uptime</div>
            <SignedOut>
                <SignInButton></SignInButton>
                <SignUpButton></SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
        </div>
    )
}